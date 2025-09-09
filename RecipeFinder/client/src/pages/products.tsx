import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";

export default function Products() {
  const productsTitleRef = useScrollReveal();
  const productsSubtitleRef = useScrollReveal();
  const productCard1Ref = useScrollReveal();
  const productCard2Ref = useScrollReveal();
  const productCard3Ref = useScrollReveal();

  const { t } = useLanguage();

  const scrollToContact = () => {
    const section = document.getElementById('contact');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={productsTitleRef as any} className="scroll-reveal text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('products.title')}
          </h2>
          <p ref={productsSubtitleRef as any} className="scroll-reveal text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div ref={productCard1Ref as any} className="scroll-reveal bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src="/src/components/Screenshot 2025-09-04 150027.png" alt="Physical therapy session" className="w-full h-48 object-cover" />
            {/* Price bubble moved below the image to avoid overlapping content */}
            <div className="px-6 -mt-6 flex justify-end">
              <div className="price-bubble text-white px-6 py-3 rounded-full font-bold text-lg bg-primary">$600 / 5 session</div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-card-foreground">{t('products.therapy.title')}</h3>
              <p className="text-muted-foreground mb-6">{t('products.therapy.description')}</p>
              <button onClick={scrollToContact} className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">{t('products.learnMore')}</button>
            </div>
          </div>

          <div ref={productCard2Ref as any} className="scroll-reveal bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" alt="Recovery treatment" className="w-full h-48 object-cover" />
            {/* Price bubble moved below the image to avoid overlapping content */}
            <div className="px-6 -mt-6 flex justify-end">
              <div className="price-bubble text-white px-6 py-3 rounded-full font-bold text-lg bg-primary">$120 / session</div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-card-foreground">{t('products.recovery.title')}</h3>
              <p className="text-muted-foreground mb-6">{t('products.recovery.description')}</p>
              <button onClick={scrollToContact} className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">{t('products.learnMore')}</button>
            </div>
          </div>

          <div ref={productCard3Ref as any} className="scroll-reveal bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" alt="Recovery room" className="w-full h-48 object-cover" />
            {/* Price bubble moved below the image to avoid overlapping content */}
            <div className="px-6 -mt-6 flex justify-end">
              <div className="price-bubble text-white px-6 py-3 rounded-full font-bold text-lg bg-primary">$49 / visit</div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-card-foreground">{t('products.recoveryRoom.title')}</h3>
              <p className="text-muted-foreground mb-6">{t('products.recoveryRoom.description')}</p>
              <button onClick={scrollToContact} className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">{t('products.learnMore')}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
