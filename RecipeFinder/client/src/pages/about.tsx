import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AboutSection() {
  const { t } = useLanguage();
  const aboutTitleRef = useScrollReveal();
  const aboutSubtitleRef = useScrollReveal();
  const aboutMapRef = useScrollReveal();
  const aboutInfoRef = useScrollReveal();

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={aboutTitleRef as any} className="scroll-reveal text-3xl md:text-4xl font-bold text-foreground mb-4">{t('about.title')}</h2>
          <p ref={aboutSubtitleRef as any} className="scroll-reveal text-xl text-muted-foreground">{t('about.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div ref={aboutMapRef as any} className="scroll-reveal">
            <div className="bg-card rounded-xl overflow-hidden shadow-lg mt-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d224.4774374217685!2d-80.32506000558757!3d25.815481253934305!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9bbb6cd315233%3A0x40628e342840a8f1!2s3Dynamic%20Sport%20Performance%20%26%20Therapy!5e0!3m2!1sen!2sus!4v1757012289240!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="3Dynamic Sport Performance & Therapy Location"
                />
            </div>
          </div>

          <div ref={aboutInfoRef as any} className="scroll-reveal space-y-8">
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-card-foreground">{t('about.contactInfo.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 border-b border-border pb-2">
                  <span>{t('about.address')}</span>
                </div>
                <div className="flex items-center space-x-3 border-b border-border pb-2">
                  <a href="tel:+17862612830" className="text-primary hover:text-accent transition-colors">(786) 261-2830</a>
                </div>
                <div className="flex items-center space-x-3 border-b border-border pb-2">
                  <a href="mailto:info@3Dynamic.com" className="text-primary hover:text-accent transition-colors">info@3Dynamic.com</a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-card-foreground">{t('about.schedule.title')}</h3>
              <div className="space-y-3">
                {[
                  { id: 'monday-friday', label: t('about.schedule.mondayFriday'), hours: '8:00 AM — 6:30 PM' },
                  { id: 'saturday', day: 'saturday', hours: '9:00 AM — 2:00 PM' },
                  { id: 'sunday', day: 'sunday', hours: 'closed' }
                ].map(({ id, day, label, hours }) => (
                  <div key={id} className="flex justify-between border-b border-border pb-2">
                    <span className="font-semibold">{label ? label : t(`about.schedule.${day}`)}</span>
                    <span className={hours === 'closed' ? 'text-muted-foreground' : ''}>
                      {typeof hours === 'string' && /\d/.test(hours) ? hours : t(`about.schedule.hours.${hours}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
