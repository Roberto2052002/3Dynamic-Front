import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";

export default function Home({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const heroTitleRef = useScrollReveal();
  const heroSubtitleRef = useScrollReveal();
  const heroCtaRef = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
        data-testid="hero-video"
      >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  <h1 ref={heroTitleRef as any} className="scroll-reveal text-4xl md:text-6xl font-bold text-white mb-6" data-testid="text-hero-title">
          {t('hero.headline')}
        </h1>
  <p ref={heroSubtitleRef as any} className="scroll-reveal text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
          {t('hero.subheadline')}
        </p>
        <button
          ref={heroCtaRef as any}
          onClick={() => scrollToSection('contact')}
          className="scroll-reveal bg-primary hover:bg-accent text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 animate-pulse-glow"
          data-testid="button-hero-cta"
        >
          {t('hero.cta')}
        </button>
      </div>
    </section>
  );
}
