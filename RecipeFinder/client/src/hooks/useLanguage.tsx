import { useState, createContext, useContext } from 'react';

interface Translation {
  [key: string]: any;
}

interface LanguageContextType {
  currentLanguage: string;
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const translations: { [key: string]: Translation } = {
  en: {
    nav: {
      home: "Home",
      products: "Services",
      reviews: "Reviews", 
      staff: "Team",
      about: "About",
      contact: "Contact"
    },
    hero: {
      headline: "Restore Your Body, Reclaim Your Life",
      subheadline: "Professional physiotherapy and recovery services designed to get you back to your best self",
      cta: "Book Your Recovery Session"
    },
    products: {
      title: "Our Services",
      subtitle: "Comprehensive care tailored to your recovery needs",
      therapy: {
        title: "Therapy",
        description: "Sessions include a comprehensive approach where we work not only to reduce pain but also to improve strength, stability, mobility and prevent relapses. We always start with an initial assessment so we can recommend the package best suited to your injury and estimated recovery time.",
      },
      recovery: {
        title: "Recovery",
  description: "Specialized sessions focused on muscle regeneration and recovery. Using techniques such as deep tissue massage, cupping, compression therapy, scraping, and trigger point release, we work to unload the muscles to reduce tension, improve circulation, and optimize physical recovery.",
      },
      recoveryRoom: {
        title: "Recovery Room",
  description: "Space designed for autonomous physical recovery where you can use regeneration tools such as sauna, cold plunge and compression boots. These therapies help improve circulation, reduce inflammation, speed muscle recovery, and promote overall well-being after training or competition."
      },
      learnMore: "Learn More"
    },
    reviews: {
      title: "What Our Patients Say",
      subtitle: "Real results from real people"
    },
    staff: {
      title: "Meet Our Expert Team",
      subtitle: "Licensed professionals dedicated to your recovery",
      member1: {
        name: "Marco Perez",
        credentials: "Partner and Founder",
        bio: "Marco is a physical therapist and LMT. He has specialized his career in the sports development area; with over 10 years of experience, he has created a work philosophy based in body motion. \"I've always envisioned 3Dynamic as the place for your body to heal, recover and improve through movement. This place is sacred and we invest all of our energy to make sure you feel better from the moment you open the door.\""
      },
      member2: {
        name: "Irene Valero",
        credentials: "Administrative Assistant",
        bio: "Irene is responsible for the administrative management at 3Dynamic. She ensures that all internal processes run smoothly and provides support to both clients and the team. \"My goal is to make every experience at 3Dynamic organized, efficient, and pleasant, so that both the team and clients can focus on what matters most: their well-being.\""
      }
    },
    about: {
      title: "Visit Our Clinic",
      subtitle: "Modern facilities designed for your comfort and recovery",
  address: "7851 NW 46th St, Doral, FL 33166",
      contactInfo: {
        title: "Contact Information"
      },
      schedule: {
          mondayFriday: "Monday — Friday",
        title: "Office Hours",
        monday: "Monday",
        tuesday: "Tuesday", 
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
        hours: {
          weekday: "7:00 AM - 7:00 PM",
          saturday: "8:00 AM - 4:00 PM",
          closed: "Closed"
        }
      }
    },
    contact: {
      title: "Start Your Recovery Today",
      subtitle: "Get in touch to schedule your consultation",
      form: {
  fullName: "Full Name",
        fullNamePlaceholder: "Enter your full name",
  email: "Email Address",
        emailPlaceholder: "Enter your email address",
  phone: "Phone Number",
        phonePlaceholder: "Enter your phone number",
  concernType: "Type of Concern",
        injury: "Injury",
        pain: "Pain",
  message: "What's happening?",
        messagePlaceholder: "Describe your situation, pain level, and what you hope to achieve...",
        agreement: "I agree to be contacted by 3Dynamic.",
        submit: "Schedule My Consultation",
        success: "Thank you! We'll contact you within 24 hours to schedule your consultation."
      }
    }
  },
  es: {
    nav: {
      home: "Inicio",
      products: "Servicios",
      reviews: "Reseñas",
      staff: "Equipo",
      about: "Acerca de",
      contact: "Contacto"
    },
    hero: {
      headline: "Restaura Tu Cuerpo, Recupera Tu Vida",
      subheadline: "Servicios profesionales de fisioterapia y recuperación diseñados para devolverte a tu mejor estado",
      cta: "Reserva Tu Sesión de Recuperación"
    },
    products: {
      title: "Nuestros Servicios",
      subtitle: "Atención integral adaptada a sus necesidades de recuperación",
      therapy: {
        title: "Fisioterapia",
        description: "Las sesiones incluyen un abordaje integral en el que trabajamos no solo en la reducción del dolor, sino también en la fuerza, estabilidad, movilidad y prevención de recaídas.\n\nPor eso, iniciamos siempre con una evaluación inicial, que nos permite recomendar el paquete más adecuado según tu lesión y el tiempo estimado de recuperación.",
      },
      recovery: {
        title: "Recuperación",
  description: "Sesión especializada en la regeneración y recuperación muscular. A través de técnicas como deep tissue massage, cupping, compression therapy, scraping y liberación de puntos gatillo, trabajamos en la descarga muscular para reducir la tensión, mejorar la circulación y optimizar la recuperación física.",
      },
      recoveryRoom: {
        title: "Cuarto de Recuperación",
  description: "Espacio diseñado para la recuperación física autónoma, donde podrás utilizar herramientas de regeneración como sauna, cold plunge y botas de compresión. Estas terapias ayudan a mejorar la circulación, reducir la inflamación, acelerar la recuperación muscular y promover el bienestar general después del entrenamiento o la competencia."
      },
      learnMore: "Saber Más"
    },
    reviews: {
      title: "Lo Que Dicen Nuestros Pacientes",
      subtitle: "Resultados reales de personas reales"
    },
    staff: {
      title: "Conoce Nuestro Equipo Experto",
      subtitle: "Profesionales licenciados dedicados a su recuperación",
      member1: {
      name: "Marco Perez",
      credentials: "Socio y Fundador",
      bio: "Marco es fisioterapeuta y LMT. Ha especializado su carrera en el área de desarrollo deportivo; con más de 10 años de experiencia, ha creado una filosofía de trabajo basada en el movimiento corporal. \"Siempre he imaginado 3Dynamic como el lugar para que tu cuerpo sane, recupere y mejore a través del movimiento. Este lugar es sagrado y ponemos toda nuestra energía para asegurarnos de que te sientas mejor desde el momento en que abres la puerta.\""
      },
      member2: {
        name: "Irene Valero",
        credentials: "Asistente Administrativa",
        bio: "Irene es la responsable de la gestión administrativa de 3Dynamic. Se encarga de que todos los procesos internos funcionen sin problemas y de brindar apoyo a clientes y al equipo. \"Mi objetivo es asegurar que cada experiencia en 3Dynamic sea organizada, eficiente y agradable, para que tanto el equipo como los clientes puedan enfocarse en lo más importante: su bienestar.\""
      }
    },
    about: {
      title: "Visita Nuestra Clínica",
      subtitle: "Instalaciones modernas diseñadas para su comodidad y recuperación",
  address: "7851 NW 46th St, Doral, FL 33166",
      contactInfo: {
        title: "Información de Contacto"
      },
      schedule: {
          mondayFriday: "Lunes — Viernes",
        title: "Horarios de Oficina",
        monday: "Lunes",
        tuesday: "Martes",
        wednesday: "Miércoles",
        thursday: "Jueves",
        friday: "Viernes",
        saturday: "Sábado",
        sunday: "Domingo",
        hours: {
          weekday: "7:00 AM - 7:00 PM",
          saturday: "8:00 AM - 4:00 PM",
          closed: "Cerrado"
        }
      }
    },
    contact: {
      title: "Comienza Tu Recuperación Hoy",
      subtitle: "Ponte en contacto para programar tu consulta",
      form: {
    fullName: "Nombre Completo",
        fullNamePlaceholder: "Ingresa tu nombre completo",
    email: "Dirección de Email",
        emailPlaceholder: "Ingresa tu dirección de email",
    phone: "Número de Teléfono",
        phonePlaceholder: "Ingresa tu número de teléfono",
    concernType: "Tipo de Problema",
        injury: "Lesión",
        pain: "Dolor",
    message: "¿Qué está pasando?",
        messagePlaceholder: "Describe tu situación, nivel de dolor y lo que esperas lograr...",
        agreement: "Acepto ser contactado por 3Dynamic.",
        submit: "Programar Mi Consulta",
        success: "¡Gracias! Te contactaremos dentro de 24 horas para programar tu consulta."
      }
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
