import { useEffect, useCallback } from 'react';
import { Calendar } from 'lucide-react';
import Home from '../pages/home';
import Products from '../pages/products';
import Reviews from '../pages/reviews';
import Staff from '../pages/staff';
import About from '../pages/about';
import Contact from '../pages/contact';
import Layout from './layout';

function PhysioLandingContent() {
  // Set permanent dark mode to match header styling in Layout
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 64;
      const targetPosition = section.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }, []);

  // If the page loads with a hash (or the hash changes), scroll to that section.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.replace('#', '');
      // small timeout to allow layout/DOM to settle
      setTimeout(() => scrollToSection(id), 50);
    };

    // Try immediately in case we landed on /#section
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [scrollToSection]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Home scrollToSection={scrollToSection} />
        <Products />
        <Reviews />
        <Staff />
        <About />
        <Contact />
      </main>

      {/* Floating CTA Button */}
      <button
        onClick={() => scrollToSection('contact')}
        className="fixed bottom-6 right-6 bg-primary hover:bg-accent text-primary-foreground p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-30 group animate-pulse-glow"
        aria-label="Schedule consultation"
        title="Schedule your consultation"
        data-testid="button-floating-cta"
      >
        <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}

export default function PhysioLanding() {
  return (
    <Layout>
      <PhysioLandingContent />
    </Layout>
  );
}
