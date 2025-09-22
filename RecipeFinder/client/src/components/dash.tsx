import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from './layout';
// optional backend adapter — set VITE_USE_API=true to enable (use a Vite env var)

const USE_API = (import.meta.env as any).VITE_USE_API === 'true';

type Submission = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  isInjuredOrInPain?: boolean;
  createdAt?: string; // ISO string, optional
  date?: string;      // ISO string, optional
};

const MOCK: Submission[] = [];

export default function DashPage() {
  const [query, setQuery] = useState('');
  const [sortOldestFirst, setSortOldestFirst] = useState(true);
  const [page, setPage] = useState(1);
  const [remoteItems, setRemoteItems] = useState<Submission[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cursor pagination: startKeys[0] === null => first page; startKeys[1] is the startKey for page 2, etc.
  const [startKeys, setStartKeys] = useState<Array<string | null>>([null]);
  const startKeysRef = useRef(startKeys);
  useEffect(() => { startKeysRef.current = startKeys; }, [startKeys]);

  const [hasNextPage, setHasNextPage] = useState(false);
  const PAGE_SIZE = 10; // keep in sync with backend
  const [totalPages, setTotalPages] = useState<number | null>(null);

  // When sort or query change, reset pagination
  useEffect(() => {
    setPage(1);
    setStartKeys([null]);
    setRemoteItems(null);
  }, [query, sortOldestFirst]);

  // Fetch submissions from backend (cursor pagination)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const sortParam = sortOldestFirst ? 'oldest' : 'newest';
    const qParam = query.trim();
    const startKey = startKeysRef.current[page - 1] ?? null;
    const url = `/dynamo/clients?sort=${sortParam}${qParam ? `&q=${encodeURIComponent(qParam)}` : ''}${startKey ? `&startKey=${encodeURIComponent(startKey)}` : ''}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (cancelled) return;
        const items = Array.isArray(data) ? data : data.items ?? [];
        setRemoteItems(items);

        const next = data && (data.nextPageKey ?? data.lastEvaluatedKey ?? null);
        setHasNextPage(!!next);
        setTotalPages(typeof data?.totalPages === 'number' ? data.totalPages : null);

        setStartKeys(prev => {
          // keep entries up to current page
          const copy = prev.slice(0, page);
          if (next) {
            copy[page] = next;
          }
          return copy;
        });
      })
      .catch(err => {
        if (cancelled) return;
        console.error('Error fetching /dynamo/clients:', err);
        setError('Failed to fetch submissions');
        setRemoteItems([]);
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [sortOldestFirst, query, page]);

  return (
    <Layout>
  <div className="max-w-8xl mx-auto p-10 mt-12 md:mt-30 bg-background text-foreground">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Submissions</h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground"><Search className="w-4 h-4" /></span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, phone, or message"
              className="pl-10 pr-4 py-2 rounded-md border border-border bg-background text-foreground w-72 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={() => setSortOldestFirst(v => !v)}
            className="px-3 py-2 rounded-md bg-muted hover:bg-accent hover:text-white text-muted-foreground transition-colors flex items-center gap-2"
            title="Toggle sort order"
          >
            {sortOldestFirst ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="text-sm">{sortOldestFirst ? 'Oldest → Newest' : 'Newest → Oldest'}</span>
          </button>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow overflow-auto">
        <table className="min-w-[1000px] table-auto w-full">
          <thead className="bg-muted/60">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Submitted</th>
              <th className="text-left px-4 py-3">Message</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-destructive">{error}</td>
              </tr>
            ) : !remoteItems || remoteItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">No submissions found.</td>
              </tr>
            ) : (
              remoteItems.map((sub: Submission) => (
                <tr key={sub.id} className="border-t border-border hover:bg-muted transition-colors align-top">
                  <td className="px-4 py-3 align-top">{sub.name}</td>
                  <td className="px-4 py-3 align-top">{sub.email}</td>
                  <td className="px-4 py-3 align-top">{sub.phone}</td>
                  <td className="px-4 py-3 align-top">{sub.isInjuredOrInPain === true ? 'Injury' : sub.isInjuredOrInPain === false ? 'Pain' : '—'}</td>
                  <td className="px-6 py-4 align-top">{sub.date ? new Date(sub.date).toLocaleDateString() : '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-normal break-words max-w-[48rem] align-top">{sub.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls (server cursor pagination) */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">{totalPages ? `Page ${page} of ${totalPages}` : `Page ${page}`}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1 || loading} className="px-3 py-1 rounded-md bg-muted hover:bg-accent transition-colors disabled:opacity-50">Prev</button>
          <div className="px-3 py-1 rounded-md bg-card">Page {page}</div>
          <button onClick={() => { if (hasNextPage) setPage(p => p + 1); }} disabled={!hasNextPage || loading} className="px-3 py-1 rounded-md bg-muted hover:bg-accent transition-colors disabled:opacity-50">Next</button>
        </div>
      </div>
      </div>
    </Layout>
  );
}
