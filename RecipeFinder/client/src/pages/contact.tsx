import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = formData.fullName.trim() !== '' && emailRegex.test(formData.email) && formData.phone.trim() !== '' && formData.message.trim() !== '' && formData.agreement && selectedConcern !== null;
    setIsFormValid(isValid);
  }, [formData, selectedConcern]);

  const handleInputChange = (field: string, value: string | boolean) => {
  // normalize email by trimming whitespace
  const newValue = field === 'email' && typeof value === 'string' ? value.trim() : value;
  setFormData(prev => ({ ...prev, [field]: newValue }));
  setFormErrors(prev => ({ ...prev, [field]: '' }));
  // clear any submit-level error when user starts editing
  setSubmitError(null);
  };

  const hasError = (field: string) => !!formErrors[field];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.fullName.trim() === '') errors.fullName = 'Full name is required.';
    const trimmedEmail = (formData.email || '').trim();
    if (!emailRegex.test(trimmedEmail)) errors.email = 'Valid email is required.';
    // store trimmed email back to state for consistency
    if (trimmedEmail !== formData.email) setFormData(prev => ({ ...prev, email: trimmedEmail }));
    if (formData.phone.trim() === '') errors.phone = 'Phone is required.';
    if (!selectedConcern) errors.concern = 'Please select a concern.';
    if (formData.message.trim() === '') errors.message = 'Message is required.';
    if (!formData.agreement) errors.agreement = 'You must accept the agreement.';

    setFormErrors(errors);
    return errors;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // validate before submitting
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      // show a professional submit-level message
      setSubmitError('Please complete the required fields highlighted.');
      // focus first error
      const firstKey = Object.keys(errors)[0];
      if (firstKey) {
        const el = document.getElementById(firstKey);
        el?.focus();
      }
      return;
    }

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
      setSubmitting(true);
      setSubmitError(null);

      const res = await fetch('/dynamo/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.log('[contact] server response not ok:', res.status, data);
        // handle server-side validation (missing fields)
        if (res.status === 400 && Array.isArray((data as any).missing)) {
          const missing: string[] = (data as any).missing;
          const errors: Record<string, string> = {};
          missing.forEach(f => { errors[f] = 'This field is required.'; });
          setFormErrors(prev => ({ ...prev, ...errors }));
          setSubmitError((data as any).error || 'Validation failed');
          return;
        }
        // duplicate entry
        if (res.status === 409) {
          const msg = (data as any).error || 'This email or phone has already been used.';
          console.log('[contact] server 409 duplicate:', msg);
          // show toast notification
          toast({ title: 'Duplicate submission', description: msg, variant: 'destructive' });
          setSubmitError(msg);
          return;
        }

        // rate limited
        if (res.status === 429) {
          const msg = (data as any).error || 'Too many submissions, please try again later.';
          console.log('[contact] server 429 rate limit:', msg);
          // show toast notification
          toast({ title: 'Too many submissions', description: msg, variant: 'destructive' });
          setSubmitError(msg);
          return;
        }

        setSubmitError((data as any).error || 'Failed to submit form');
        return;
      }

  // success
  console.log('[contact] server success:', data);
      setShowSuccess(true);
      setFormData({ fullName: '', email: '', phone: '', message: '', agreement: false });
      setSelectedConcern(null);
      setFormErrors({});
      setTimeout(() => {
        const successElement = document.getElementById('success-message');
        successElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (err) {
      console.error('Failed to submit lead:', err);
      setSubmitError('Failed to submit form. Please try again later.');
    } finally {
      setSubmitting(false);
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
          <form noValidate onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-card-foreground mb-2">{t('contact.form.fullName')}</label>
              <input type="text" id="fullName" name="fullName" aria-required={true} aria-invalid={hasError('fullName') ? 'true' : 'false'} value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} onBlur={() => {
                if (formData.fullName.trim() === '') setFormErrors(prev => ({ ...prev, fullName: 'Full name is required.' }));
                else setFormErrors(prev => ({ ...prev, fullName: '' }));
              }} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors bg-white text-slate-900 placeholder:text-muted-foreground ${hasError('fullName') ? 'border-destructive ring-1 ring-destructive/30' : 'border-border'}`} placeholder={t('contact.form.fullNamePlaceholder')} />
              {formErrors.fullName && <p className="mt-1 text-sm text-destructive">{formErrors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-card-foreground mb-2">{t('contact.form.email')}</label>
              <input type="text" id="email" name="email" aria-required={true} aria-invalid={hasError('email') ? 'true' : 'false'} value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} onBlur={() => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const trimmed = (formData.email || '').trim();
                if (!emailRegex.test(trimmed)) setFormErrors(prev => ({ ...prev, email: 'Valid email is required.' }));
                else setFormErrors(prev => ({ ...prev, email: '' }));
                if (trimmed !== formData.email) setFormData(prev => ({ ...prev, email: trimmed }));
              }} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors bg-white text-slate-900 placeholder:text-muted-foreground ${hasError('email') ? 'border-destructive ring-1 ring-destructive/30' : 'border-border'}`} placeholder={t('contact.form.emailPlaceholder')} />
              {formErrors.email && <p className="mt-1 text-sm text-destructive">{formErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-card-foreground mb-2">{t('contact.form.phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  aria-required={true}
                  aria-invalid={hasError('phone') ? 'true' : 'false'}
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={15}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', (e.target.value || '').replace(/\D/g, ''))}
                  onBlur={() => {
                    const digits = (formData.phone || '').replace(/\D/g, '');
                    if (!digits) setFormErrors(prev => ({ ...prev, phone: 'Phone is required.' }));
                    else if (!/^\d{7,15}$/.test(digits)) setFormErrors(prev => ({ ...prev, phone: 'Enter a valid phone number (7-15 digits).' }));
                    else setFormErrors(prev => ({ ...prev, phone: '' }));
                  }}
                  className={`${hasError('phone') ? 'border-destructive ring-1 ring-destructive/30' : 'border-border'} w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors bg-white text-slate-900 placeholder:text-muted-foreground`}
                  onKeyDown={(e) => {
                    // allow navigation and control keys
                    const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'];
                    if (allowed.includes(e.key)) return;
                    // allow copy/cut/paste/select all
                    if ((e.ctrlKey || e.metaKey) && ['a','c','v','x'].includes(e.key.toLowerCase())) return;
                    // block any non-digit key
                    if (e.key.length === 1 && !/\d/.test(e.key)) e.preventDefault();
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const text = (e.clipboardData?.getData('text') || '').replace(/\D/g, '');
                    handleInputChange('phone', text);
                  }}
                  placeholder={t('contact.form.phonePlaceholder')}
                />
                {formErrors.phone && <p className="mt-1 text-sm text-destructive">{formErrors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-card-foreground mb-4">{t('contact.form.concernType')}</label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" id="concern-injury" onClick={() => { setSelectedConcern('injury'); setFormErrors(prev => ({ ...prev, concern: '' })); }} className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-300 hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring ${selectedConcern === 'injury' ? 'concern-btn selected' : (hasError('concern') ? 'border-destructive' : 'border-border')}`}>{t('contact.form.injury')}</button>
                <button type="button" id="concern-pain" onClick={() => { setSelectedConcern('pain'); setFormErrors(prev => ({ ...prev, concern: '' })); }} className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-300 hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring ${selectedConcern === 'pain' ? 'concern-btn selected' : (hasError('concern') ? 'border-destructive' : 'border-border')}`}>{t('contact.form.pain')}</button>
              </div>
              {formErrors.concern && <p className="mt-1 text-sm text-destructive">{formErrors.concern}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-card-foreground mb-2">{t('contact.form.message')}</label>
              <textarea id="message" name="message" rows={5} aria-required={true} aria-invalid={hasError('message') ? 'true' : 'false'} value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} onBlur={() => {
                if (formData.message.trim() === '') setFormErrors(prev => ({ ...prev, message: 'Message is required.' }));
                else setFormErrors(prev => ({ ...prev, message: '' }));
              }} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none bg-white text-slate-900 placeholder:text-muted-foreground" placeholder={t('contact.form.messagePlaceholder')} />
              {formErrors.message && <p className="mt-1 text-sm text-destructive">{formErrors.message}</p>}
            </div>

            <div className="flex items-center space-x-3">
              <input type="checkbox" id="agreement" name="agreement" aria-required={true} aria-invalid={hasError('agreement') ? 'true' : 'false'} checked={formData.agreement} onChange={(e) => { handleInputChange('agreement', e.target.checked); if (e.target.checked) setFormErrors(prev => ({ ...prev, agreement: '' })); else setFormErrors(prev => ({ ...prev, agreement: 'You must accept the agreement.' })); }} className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-ring" />
              <label htmlFor="agreement" className="text-sm text-card-foreground">{t('contact.form.agreement')}</label>
            </div>
            {formErrors.agreement && <p className="mt-1 text-sm text-destructive">{formErrors.agreement}</p>}

            <button
              type="submit"
              aria-disabled={!isFormValid || submitting}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 bg-blue-600 text-white hover:bg-blue-500 shadow-lg hover:shadow-xl ${(!isFormValid || submitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Sending...' : t('contact.form.submit')}
            </button>
            {submitError && <p className="mt-2 text-sm text-destructive">{submitError}</p>}

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
