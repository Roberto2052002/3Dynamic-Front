import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import Layout from './layout';

const translations = {
  en: {
    title: 'Policies & Consent',
    generalTitle: 'General consent',
    general: `I authorize 3Dynamic Sport Performance and Therapy to perform therapy sessions as agreed. It is my decision to receive massage therapy, and I acknowledge that it does not replace medical care, medical examination, or diagnosis. I have disclosed all known medical conditions and will inform my therapist of any changes in my health status. Patients are advised that they may experience soreness, bruising, or small red marks (petechiae) in the treated area for 3 to 7 days following the sessions. I recognize the risks associated with training and therapy activities and agree to participate at my own risk. I release 3Dynamic Sport Performance and Therapy, its managers, and staff from any liability for injuries or damages and agree not to file any legal claims. I assume full responsibility for any known or unknown risks associated with my participation.`,
    cancelTitle: 'Cancellation policy',
    cancel: `I understand that I must notify at least 24 hours in advance if I need to cancel or reschedule; otherwise, I will forfeit the deposit, and a new deposit will be required for future appointments. For session packages, if an appointment is canceled with less than 24 hours' notice, the session will be considered as completed.`,
    packagesTitle: 'Estimated package timelines',
    packages: [
      'Packages of 5 and 10 sessions: 1 month',
      'Package of 20 sessions: 2 months',
      'Packages of 36 sessions: 3 months'
    ],
    confidentialityTitle: 'Confidentiality of information',
    confidentiality: 'All personal and health information provided will be kept confidential and will only be shared if required by law.',
    mediaTitle: 'Photo & Video release',
    media1: `By receiving any service at 3Dynamic Sport Performance & Therapy, I authorize and give consent for photographs and/or video recordings to be taken during their session. I understand that such material may be used by 3Dynamic for informational, educational, promotional, and advertising purposes on social media, website, and other communication channels.`,
    media2: `The client understands that these images or videos may be edited and published without any right to financial compensation, while 3Dynamic commits to always preserving the client’s dignity and integrity.`,
    indemnificationTitle: 'Indemnification',
    indemnification: 'I agree to indemnify and hold harmless 3Dynamic Sport Performance and Therapy and its staff from any legal claims or actions, including associated legal costs.',
    accept: 'I have read and accept',
    print: 'Print',
  },
  es: {
    title: 'Políticas y Consentimiento',
    generalTitle: 'Consentimiento general',
    general: `Autorizo a 3Dynamic Sport Performance and Therapy a realizar sesiones de terapia según lo acordado. Es mi decisión recibir terapia de masaje y reconozco que no reemplaza la atención médica, el examen médico ni el diagnóstico. He revelado todas las condiciones médicas conocidas e informaré a mi terapeuta sobre cualquier cambio en mi estado de salud. Se recomienda a los pacientes que pueden experimentar dolor, moretones o pequeñas marcas rojas (petequias) en el área tratada durante 3 a 7 días después de las sesiones. Reconozco los riesgos asociados con las actividades de entrenamiento y terapia y acepto participar bajo mi propio riesgo. Eximo a 3Dynamic Sport Performance and Therapy, sus administradores y personal de cualquier responsabilidad por lesiones o daños y acepto no presentar ninguna reclamación legal. Asumo plena responsabilidad por cualquier riesgo conocido o desconocido asociado con mi participación.`,
    cancelTitle: 'Política de cancelación',
    cancel: `Entiendo que debo notificar con al menos 24 horas de antelación si necesito cancelar o reprogramar; de lo contrario, perderé el depósito y se requerirá un nuevo depósito para futuras citas. Para los paquetes de sesiones, si una cita se cancela con menos de 24 horas de aviso, la sesión se considerará como completada.`,
    packagesTitle: 'Tiempos estimados para los paquetes',
    packages: [
      'Paquetes de 5 y 10 sesiones: 1 mes',
      'Paquete de 20 sesiones: 2 meses',
      'Paquetes de 36 sesiones: 3 meses'
    ],
    confidentialityTitle: 'Confidencialidad de la información',
    confidentiality: 'Toda la información personal y de salud proporcionada se mantendrá confidencial y solo se compartirá si lo exige la ley.',
    mediaTitle: 'Autorización de fotos y videos',
    media1: `Al recibir cualquier servicio en 3Dynamic Sport Performance and Therapy, autorizo y doy consentimiento para que se tomen fotografías y/o grabaciones de video durante mi sesión. Entiendo que dicho material puede ser utilizado por 3Dynamic con fines informativos, educativos, promocionales y publicitarios en redes sociales, sitio web y otros canales de comunicación.`,
    media2: `El cliente entiende que estas imágenes o videos pueden ser editados y publicados sin derecho a compensación económica, mientras que 3Dynamic se compromete a preservar siempre la dignidad e integridad del cliente.`,
    indemnificationTitle: 'Indemnificación',
    indemnification: 'Acepto indemnizar y eximir de responsabilidad a 3Dynamic Sport Performance and Therapy y a su personal de cualquier reclamación o acción legal, incluidos los costos legales asociados.',
    accept: 'He leído y acepto',
    print: 'Imprimir',
}
};

function Policy() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as 'en' | 'es'];

  return (
    <Layout>
  <div className="max-w-4xl mx-auto p-6 mt-12 md:mt-20 bg-background text-foreground">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">{t.generalTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.general}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">{t.cancelTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.cancel}</p>
            <div className="mt-4">
              <h3 className="font-semibold">{t.packagesTitle}</h3>
              <ul className="list-disc list-inside text-muted-foreground mt-2">
                {t.packages.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">{t.confidentialityTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.confidentiality}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">{t.mediaTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.media1}</p>
            <p className="text-muted-foreground leading-relaxed mt-3">{t.media2}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">{t.indemnificationTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.indemnification}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Policy;
