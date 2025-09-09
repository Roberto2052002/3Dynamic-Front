import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Phone, MapPin, Mail, Calendar, Star } from 'lucide-react';
import { LanguageProvider, useLanguage } from '../hooks/useLanguage';
import HeaderLogo from './Screenshot 2025-09-03 160458.png';
import LogoImg from './Screenshot 2025-09-03 154710.png';
import SocialBubbles from './bubble';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Home from '../pages/home';
import Products from '../pages/products';
import Reviews from '../pages/reviews';
import Staff from '../pages/staff';
import About from '../pages/about';
import Contact from '../pages/contact';

const reviewsData = [
  { stars: 5, textKey: 'review1', name: "Maria R." },
  { stars: 5, textKey: 'review2', name: "James T." },
  { stars: 5, textKey: 'review3', name: "Lisa M." },
  { stars: 4, textKey: 'review4', name: "David K." },
  { stars: 5, textKey: 'review5', name: "Ana S." },
  { stars: 5, textKey: 'review6', name: "Robert C." },
  { stars: 4, textKey: 'review7', name: "Jennifer L." },
  { stars: 5, textKey: 'review8', name: "Carlos M." },
  { stars: 5, textKey: 'review9', name: "Emily R." },
  { stars: 4, textKey: 'review10', name: "Thomas W." }
];

const reviewTexts = {
  en: {
    review1: "Dr. Johnson helped me recover from a knee injury faster than I thought possible. Amazing care!",
    review2: "The recovery suite is like a luxury spa but with medical expertise. Worth every penny.",
    review3: "Professional, clean, and effective. My chronic back pain is finally manageable.",
    review4: "Great staff and modern equipment. Appointment scheduling is very convenient.",
    review5: "Michael's movement analysis identified issues I didn't even know I had. Game changer!",
    review6: "Recovered from shoulder surgery ahead of schedule. The team here is phenomenal.",
    review7: "Clean facilities, caring staff, and excellent results. Highly recommend!",
    review8: "The advanced recovery techniques here are unlike anything I've experienced.",
    review9: "From injury to full strength in just 8 weeks. These people know what they're doing.",
    review10: "Professional environment with cutting-edge technology. Very impressed with the care."
  },
  es: {
    review1: "La Dra. Johnson me ayudó a recuperarme de una lesión de rodilla más rápido de lo que pensé posible. ¡Atención increíble!",
    review2: "La suite de recuperación es como un spa de lujo pero con experiencia médica. Vale cada centavo.",
    review3: "Profesional, limpio y efectivo. Mi dolor crónico de espalda finalmente es manejable.",
    review4: "Excelente personal y equipo moderno. La programación de citas es muy conveniente.",
    review5: "El análisis de movimiento de Michael identificó problemas que ni sabía que tenía. ¡Cambió todo!",
    review6: "Me recuperé de la cirugía de hombro antes de lo previsto. El equipo aquí es fenomenal.",
    review7: "Instalaciones limpias, personal atento y excelentes resultados. ¡Altamente recomendado!",
    review8: "Las técnicas de recuperación avanzada aquí son como nada que haya experimentado.",
    review9: "De lesión a fuerza completa en solo 8 semanas. Esta gente sabe lo que hace.",
    review10: "Ambiente profesional con tecnología de vanguardia. Muy impresionado con la atención."
  }
};

function PhysioLandingContent() {
  const { currentLanguage, t, toggleLanguage } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    agreement: false
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Set permanent dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Scroll reveal refs
  const heroTitleRef = useScrollReveal();
  const heroSubtitleRef = useScrollReveal();
  const heroCtaRef = useScrollReveal();
  const productsTitleRef = useScrollReveal();
  const productsSubtitleRef = useScrollReveal();
  const reviewsTitleRef = useScrollReveal();
  const reviewsSubtitleRef = useScrollReveal();
  const staffTitleRef = useScrollReveal();
  const staffSubtitleRef = useScrollReveal();
  const aboutTitleRef = useScrollReveal();
  const aboutSubtitleRef = useScrollReveal();
  const aboutMapRef = useScrollReveal();
  const aboutInfoRef = useScrollReveal();
  const contactTitleRef = useScrollReveal();
  const contactSubtitleRef = useScrollReveal();
  const contactFormRef = useScrollReveal();

  // Product cards refs
  const productCard1Ref = useScrollReveal();
  const productCard2Ref = useScrollReveal();
  const productCard3Ref = useScrollReveal();

  // Staff cards refs
  const staffCard1Ref = useScrollReveal();
  const staffCard2Ref = useScrollReveal();

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 64;
      const targetPosition = section.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
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

  // When the page loads with a hash (or the hash changes), scroll to that section.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollFromHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        // defer so layout settles
        setTimeout(() => scrollToSection(id), 50);
      }
    };

    scrollFromHash();
    window.addEventListener('hashchange', scrollFromHash);
    return () => window.removeEventListener('hashchange', scrollFromHash);
  }, [scrollToSection]);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
    document.body.classList.remove('sidebar-open');
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
    document.body.classList.add('sidebar-open');
  }, []);

  // Form validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = 
      formData.fullName.trim() !== '' &&
      emailRegex.test(formData.email) &&
      formData.phone.trim() !== '' &&
      formData.message.trim() !== '' &&
      formData.agreement &&
      selectedConcern !== null;
    
    setIsFormValid(isValid);
  }, [formData, selectedConcern]);

  // Section highlighting
  useEffect(() => {
    const sections = ['home', 'products', 'reviews', 'staff', 'about', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, closeSidebar]);

  // Focus trap for sidebar
  useEffect(() => {
    if (sidebarOpen && sidebarRef.current) {
      const focusableElements = sidebarRef.current.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      sidebarRef.current.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => {
        sidebarRef.current?.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [sidebarOpen]);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    closeSidebar();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      concernType: selectedConcern,
      language: currentLanguage,
      timestamp: new Date().toISOString()
    };

    console.log('Form submitted:', submissionData);
    
    setShowSuccess(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: '',
      agreement: false
    });
    setSelectedConcern(null);

    setTimeout(() => {
      const successElement = document.getElementById('success-message');
      successElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip to content link */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        data-testid="skip-to-content"
      >
        Skip to content
      </a>

      {/* Top Bar (shared layout) */}
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
              <a href="tel:+1234567890" className="text-primary flex items-center space-x-2" style={{ color: '#F7F7F7' }}>
                <Phone className="w-4 h-4" />
                <span>(123) 456-7890</span>
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
            <a
              href="/"
              onClick={(e) => {
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="pointer-events-auto"
            >
              <img src={HeaderLogo} alt="PhysioCore" className="h-12 md:h-16 lg:h-20 object-contain -translate-x-2" />
            </a>
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
                      // close sidebar first so the animation can run
                      closeSidebar();
                      // scroll after a short delay
                      setTimeout(() => scrollToSection(section), 160);
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

      {/* Main Content */}
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
    <LanguageProvider>
      <PhysioLandingContent />
    </LanguageProvider>
  );
}
