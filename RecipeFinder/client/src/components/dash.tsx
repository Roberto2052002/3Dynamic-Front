import React, { useEffect, useMemo, useState } from 'react';
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
  createdAt: string; // ISO string
};

const MOCK: Submission[] = [];

export default function DashPage() {
  const [query, setQuery] = useState('');
  const [sortOldestFirst, setSortOldestFirst] = useState(true);
  const [page, setPage] = useState(1);
  const [remoteItems, setRemoteItems] = useState<Submission[] | null>(null);
  const pageSize = 11;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = remoteItems ?? MOCK;
    let list = source.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.phone || '').toLowerCase().includes(q) ||
      (s.message || '').toLowerCase().includes(q)
    );

    list = list.sort((a, b) => {
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return sortOldestFirst ? ta - tb : tb - ta;
    });

    return list;
  }, [query, sortOldestFirst, remoteItems]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [query, sortOldestFirst]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  // Clamp page if filtered items shrink
  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Backend adapter disabled for now — keep dashboard local/mock-only.
  useEffect(() => {
    console.log('DashPage: backend calls disabled; using MOCK data');
    // If you later want to re-enable API calls, restore the dynamic import flow here
  }, []);

  return (
    <Layout>
  <div className="max-w-7xl mx-auto p-6 mt-12 md:mt-20 bg-background text-foreground">
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
              <th className="text-left px-4 py-3">Submitted</th>
              <th className="text-left px-4 py-3">Message</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground">No submissions found.</td>
              </tr>
            ) : (
              paginated.map(sub => (
                <tr key={sub.id} className="border-t border-border hover:bg-muted transition-colors align-top">
                  <td className="px-4 py-3 align-top">{sub.name}</td>
                  <td className="px-4 py-3 align-top">{sub.email}</td>
                  <td className="px-4 py-3 align-top">{sub.phone}</td>
                  <td className="px-4 py-3 align-top">{new Date(sub.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-normal break-words max-w-[48rem] align-top">{sub.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filtered.length)} of {filtered.length}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded-md bg-muted hover:bg-accent transition-colors disabled:opacity-50">Prev</button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button key={pageNum} onClick={() => setPage(pageNum)} className={`px-3 py-1 rounded-md ${page === pageNum ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'}`}>{pageNum}</button>
            );
          })}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded-md bg-muted hover:bg-accent transition-colors disabled:opacity-50">Next</button>
        </div>
      </div>
      </div>
    </Layout>
  );
}
