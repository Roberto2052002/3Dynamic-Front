import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Staff() {
  const { t } = useLanguage();
  const staffTitleRef = useScrollReveal();
  const staffSubtitleRef = useScrollReveal();
  const staffCard1Ref = useScrollReveal();
  const staffCard2Ref = useScrollReveal();

  return (
    <section id="staff" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={staffTitleRef as any} className="scroll-reveal text-3xl md:text-4xl font-bold text-foreground mb-4">{t('staff.title')}</h2>
          <p ref={staffSubtitleRef as any} className="scroll-reveal text-xl text-muted-foreground">{t('staff.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div ref={staffCard1Ref as any} className="scroll-reveal bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <img src="/src/components/Screenshot 2025-09-04 144412.png" alt="Marco Perez" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary/20" />
            <div className="text-center">
              <h3 className="text-2xl font-bold text-card-foreground mb-2">{t('staff.member1.name')}</h3>
              <p className="text-primary font-semibold mb-4">{t('staff.member1.credentials')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('staff.member1.bio')}</p>
            </div>
          </div>

          <div ref={staffCard2Ref as any} className="scroll-reveal bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <img src="/src/components/Screenshot 2025-09-05 095310.png" alt="Irene Valero" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary/20" />
            <div className="text-center">
              <h3 className="text-2xl font-bold text-card-foreground mb-2">{t('staff.member2.name')}</h3>
              <p className="text-primary font-semibold mb-4">{t('staff.member2.credentials')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('staff.member2.bio')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
