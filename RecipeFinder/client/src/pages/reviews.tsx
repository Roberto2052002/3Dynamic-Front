import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollReveal } from '../hooks/useScrollReveal';

const reviewsData = [
  { stars: 5, textKey: 'review1', name: 'Melissa Apruzzese.' },
  { stars: 5, textKey: 'review2', name: 'Luis Rivera.' },
  { stars: 5, textKey: 'review3', name: 'Valeria Morales.' },
  { stars: 5, textKey: 'review4', name: 'Inger Devera.' },
  { stars: 5, textKey: 'review5', name: 'Pedro Sanchez.' },
  { stars: 5, textKey: 'review6', name: 'Grayson Espinal.' },
  { stars: 5, textKey: 'review7', name: 'Daniela Valero.' },
  { stars: 5, textKey: 'review8', name: 'Luis Armando Morillo.' },
  { stars: 5, textKey: 'review9', name: 'Francisco Acuña.' },
  { stars: 5, textKey: 'review10', name: 'Fuzet Charani.' },
];

const reviewTexts = {
  en: {
    review1: "Marco and his wife Irene at 3Dynamic are absolutely wonderful! They are both incredibly kind, professional, and knowledgeable.",
    review2: "As a runner, finding a team that supports me through my training cycles is essential and at 3Dynamic, I found that and more. ",
    review3: "I love this place! Marcos and his wife are the best! Always willing to help and make my recovery journey a success.",
    review4: "I can’t recommend 3Dynamic enough! As a mom of three young athletes, finding a physical therapy place that they not only benefit from but also enjoy is rare.",
    review5: "3Dynamic Therapy is definitely the best therapy center for anyone looking to rehabilitate themselves or improve their overall athletic performance!",
    review6: "What an amazing journey and group of people to push me through it! I want to give a huge shoutout to Marco, he’s the man behind my great progress.",
    review7: "Their services are amazing! The staff is really friendly and kind. The environment is so fun which makes it a lot easier to go and get my therapy done.",
    review8: "The best injury recovery center in all of Florida. 100% recommended. Marco and his wife are wonderful people who care for you and care about you.",
    review9: "When we have been to their facilities, we have received excellent and professional attention from the 3DYNAMIC Team.",
    review10: "A great place to recover from an injury and also for recovery. The guys treated me wonderfully. I loved the energy of the place and left feeling refreshed."
  },
  es: {
  review1: "Marco y su esposa Irene en 3Dynamic son absolutamente maravillosos: muy amables, profesionales y con mucho conocimiento.",
  review2: "Como corredor, encontrar un equipo que me apoye durante mis ciclos de entrenamiento es fundamental; en 3Dynamic encontré eso y mucho más.",
  review3: "¡Me encanta este lugar! Marco y su esposa son los mejores. Siempre dispuestos a ayudar y a que mi recuperación sea un éxito.",
  review4: "¡No puedo recomendar 3Dynamic lo suficiente! Como madre de tres jóvenes deportistas, encontrar una clínica que además les guste es raro.",
  review5: "3Dynamic Therapy es, sin duda, el mejor centro para rehabilitarse o mejorar el rendimiento deportivo.",
  review6: "¡Qué viaje tan increíble y qué equipo para impulsarme! Un gran reconocimiento a Marco; él fue clave en mi progreso.",
  review7: "Sus servicios son excelentes. El personal es muy amable y el ambiente hace que sea más fácil cumplir con la terapia.",
  review8: "El mejor centro de recuperación de lesiones en Florida. 100% recomendado. Marco y su esposa son personas maravillosas que se preocupan por ti.",
  review9: "Cuando hemos visitado sus instalaciones, siempre recibimos una atención excelente y profesional por parte del equipo de 3DYNAMIC.",
  review10: "Un lugar estupendo para recuperarse de una lesión. Me trataron de maravilla; me encantó la energía del lugar y me fui renovado."
  }
};

export default function ReviewsSection() {
  const { currentLanguage, t } = useLanguage();
  const reviewsTitleRef = useScrollReveal();
  const reviewsSubtitleRef = useScrollReveal();

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={reviewsTitleRef as any} className="scroll-reveal text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{t('reviews.title')}</h2>
          <p ref={reviewsSubtitleRef as any} className="scroll-reveal text-xl text-muted-foreground text-center">{t('reviews.subtitle')}</p>
        </div>

        <div className="carousel-container overflow-hidden">
          <div className="flex space-x-6 animate-scroll-horizontal hover-pause">
            {[...reviewsData, ...reviewsData].map((review, index) => (
              <div key={index} className="flex-shrink-0 w-80 bg-card rounded-lg p-6 shadow-lg flex flex-col justify-between h-64">
                <div>
                  <div className="flex mb-3">{renderStars(review.stars)}</div>
                  <p className="text-card-foreground mb-4 italic mt-4">"{reviewTexts[currentLanguage as keyof typeof reviewTexts][review.textKey as keyof typeof reviewTexts.en]}"</p>
                </div>
                <p className="font-semibold text-primary mt-4">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
