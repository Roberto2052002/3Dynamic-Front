import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage, LanguageProvider } from '../hooks/useLanguage';
import HeaderLogo from './Screenshot 2025-09-03 160458.png';
import LogoImg from './Screenshot 2025-09-03 154710.png';
import SocialBubbles from './bubble';
import { Phone, Menu } from 'lucide-react';

function LayoutInner({ children }: { children: React.ReactNode }) {
  const { currentLanguage, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
    document.body.classList.remove('sidebar-open');
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
    document.body.classList.add('sidebar-open');
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 64;
      const targetPosition = section.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }, []);

  // enforce permanent dark mode to match PhysioLanding header styling
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 w-full bg-[#070708] border-b border-border z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20 md:h-24 lg:h-28">
            <button
              onClick={openSidebar}
              className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring md:transform md:-translate-x-2"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* mobile-only language switch next to hamburger */}
            <button
              onClick={toggleLanguage}
              className="ml-2 px-2 py-1 rounded-md bg-muted hover:bg-accent hover:text-accent-foreground transition-colors font-medium md:hidden"
              aria-label="Toggle language"
            >
              {currentLanguage.toUpperCase()}
            </button>

            <div className="flex-1" style={{ minHeight: '56px' }} />

            <div className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4 translate-x-0 md:translate-x-6">
              <a href="tel:+17862612830" className="text-primary flex items-center transform -translate-x-10 md:translate-x-0 mr-2" style={{ color: '#F7F7F7' }} aria-label="Call (786) 261-2830">
                <Phone className="w-4 h-4" />
                <span className="sr-only">(786) 261-2830</span>
              </a>
              <button
                onClick={toggleLanguage}
                className="hidden md:inline-flex px-3 py-1 rounded-md bg-muted hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
              >
                {currentLanguage.toUpperCase()}
              </button>
            </div>

          </div>

          {/* center the header logo relative to the same container as the page sections */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Link
              to="/"
              className="pointer-events-auto"
              onClick={(e: React.MouseEvent) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  // navigate to home
                  e.preventDefault();
                  navigate('/');
                }
              }}
            >
              <img src={HeaderLogo} alt="PhysioCore" className="h-12 md:h-16 lg:h-20 object-contain -translate-x-2" />
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation (shared) */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-50 transition-all duration-300 ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeSidebar}
      >
        <nav
          ref={sidebarRef}
          className={`fixed left-0 top-0 h-full w-80 bg-white dark:bg-card shadow-xl transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ backgroundColor: '#ffffff', color: 'var(--card)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center justify-center flex-col">
                <img src={LogoImg} alt="PhysioCore" className="h-28 object-contain mb-2 max-w-[220px]" />
              </div>
            </div>

            <ul className="space-y-4">
              {['home', 'products', 'reviews', 'staff', 'about', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      // Close the sidebar first so the animation runs
                      closeSidebar();
                      if (location.pathname === '/') {
                        // same-page: scroll after a short delay
                        setTimeout(() => scrollToSection(section), 160);
                      } else {
                        // navigate to home with hash after a short delay
                        setTimeout(() => navigate(`/#${section}`), 160);
                      }
                    }}
                    className="w-full text-left py-3 px-4 rounded-md hover:bg-muted hover:text-white dark:hover:text-white transition-colors text-lg font-semibold capitalize"
                  >
                    {t ? t(`nav.${section}`) : section}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social bubbles fixed at the bottom of the sidebar */}
          <div className="absolute bottom-6 left-0 w-full flex justify-center">
            <SocialBubbles />
          </div>
        </nav>
      </div>

      <main style={{ paddingTop: 80 }}>{children}</main>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LayoutInner>{children}</LayoutInner>
    </LanguageProvider>
  );
}
