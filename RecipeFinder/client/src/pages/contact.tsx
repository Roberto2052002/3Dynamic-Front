import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ContactSection() {
  const { t, currentLanguage } = useLanguage();
  const contactTitleRef = useScrollReveal();
  const contactSubtitleRef = useScrollReveal();
  const contactFormRef = useScrollReveal();

  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '', agreement: false });
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = formData.fullName.trim() !== '' && emailRegex.test(formData.email) && formData.phone.trim() !== '' && formData.message.trim() !== '' && formData.agreement && selectedConcern !== null;
    setIsFormValid(isValid);
  }, [formData, selectedConcern]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      // backend expects `name`
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      // contactMe: we assume user is asking to be contacted when submitting
      contactMe: true,
      // isInjuredOrInPain: true when concern is injury or pain
      isInjuredOrInPain: selectedConcern === 'injury' || selectedConcern === 'pain',
      message: formData.message,
    };

    try {
      // Local-only: log the payload instead of sending to any backend
      console.log('Form submitted (local):', payload);

      setShowSuccess(true);
      setFormData({ fullName: '', email: '', phone: '', message: '', agreement: false });
      setSelectedConcern(null);
      setTimeout(() => {
        const successElement = document.getElementById('success-message');
        successElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (err) {
      console.error('Failed to submit lead:', err);
      // show a simple alert — keep UI changes minimal
      alert('Failed to submit form. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={contactTitleRef as any} className="scroll-reveal text-3xl md:text-4xl font-bold text-foreground mb-4">{t('contact.title')}</h2>
          <p ref={contactSubtitleRef as any} className="scroll-reveal text-xl text-muted-foreground">{t('contact.subtitle')}</p>
        </div>

        <div ref={contactFormRef as any} className="scroll-reveal bg-card rounded-xl p-8 shadow-lg">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-card-foreground mb-2">{t('contact.form.fullName')}</label>
              <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors bg-white text-slate-900 placeholder:text-muted-foreground" placeholder={t('contact.form.fullNamePlaceholder')} />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-card-foreground mb-2">{t('contact.form.email')}</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors bg-white text-slate-900 placeholder:text-muted-foreground" placeholder={t('contact.form.emailPlaceholder')} />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-card-foreground mb-2">{t('contact.form.phone')}</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors bg-white text-slate-900 placeholder:text-muted-foreground" placeholder={t('contact.form.phonePlaceholder')} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-card-foreground mb-4">{t('contact.form.concernType')}</label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setSelectedConcern('injury')} className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-300 hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring ${selectedConcern === 'injury' ? 'concern-btn selected' : 'border-border'}`}>{t('contact.form.injury')}</button>
                <button type="button" onClick={() => setSelectedConcern('pain')} className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-300 hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring ${selectedConcern === 'pain' ? 'concern-btn selected' : 'border-border'}`}>{t('contact.form.pain')}</button>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-card-foreground mb-2">{t('contact.form.message')}</label>
              <textarea id="message" name="message" rows={5} required value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none bg-white text-slate-900 placeholder:text-muted-foreground" placeholder={t('contact.form.messagePlaceholder')} />
            </div>

            <div className="flex items-center space-x-3">
              <input type="checkbox" id="agreement" name="agreement" required checked={formData.agreement} onChange={(e) => handleInputChange('agreement', e.target.checked)} className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-ring" />
              <label htmlFor="agreement" className="text-sm text-card-foreground">{t('contact.form.agreement')}</label>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 bg-blue-600 text-white hover:bg-blue-500 shadow-lg hover:shadow-xl"
            >
              {t('contact.form.submit')}
            </button>

            {showSuccess && (
              <div id="success-message" className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">{t('contact.form.success')}</p>
              </div>
            )}
          </form>
          <div id="consent" className="mt-4 text-sm text-muted-foreground revealed text-center" style={{ opacity: 1 }}>
            <a href="/policy" onClick={(e) => { e.preventDefault(); window.location.assign('/policy'); }} className="text-blue-600 dark:text-blue-400 hover:underline">Consent</a>
            <span className="mx-2">|</span>
            <a href="/policy" onClick={(e) => { e.preventDefault(); window.location.assign('/policy'); }} className="text-blue-600 dark:text-blue-400 hover:underline">Policy</a>
          </div>
        </div>
        
      </div>
    </section>
  );
}
