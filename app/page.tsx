'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Star, Globe, ArrowRight, ArrowDown, CheckCircle2, ChevronDown, Lightbulb, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/phone-input';
import { supabase } from '@/lib/supabase';
import { generateEventId, sendCAPIEvent } from '@/lib/meta-capi';
import { translations, Language } from '@/lib/translations';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

function AnimatedSection({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<Language>('en');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [heroLoaded, setHeroLoaded] = useState(false);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) {
      setIsSubmitting(false);
      setError(isRtl ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number');
      return;
    }

    try {
      const { error: submitError } = await supabase
        .from('leads')
        .insert({
          full_name: fullName.trim(),
          phone: phone.trim(),
          language: lang,
          source: 'guide-download',
          stage: 'New Lead / Guide Request',
        });

      if (submitError) {
        console.error('Supabase error:', submitError);
        setIsSubmitting(false);
        setError(t.errorMessage);
        return;
      }

      const eventId = generateEventId();
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact', {}, { eventID: eventId });
      }
      sendCAPIEvent({
        event_name: 'Contact',
        event_id: eventId,
        first_name: fullName.trim(),
        phone: phone.trim(),
      });

      router.push('/guide-download-thanks');
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      setError(t.errorMessage);
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={`min-h-screen ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <section className="relative min-h-screen-safe flex flex-col">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_55%_8%/0.85)] via-[hsl(220_55%_10%/0.8)] to-[hsl(220_55%_12%/0.95)]" />
        </div>

        <header className="relative z-20 py-4 sm:py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <img
                src="https://i.ibb.co/RpWFtbtd/FPB-Logo-in-Colour-1411x418-150px-1-3-1.png"
                alt="Fast Passport Boutique"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>

            <button
              onClick={toggleLanguage}
              aria-label={isRtl ? 'Switch to English' : 'التبديل إلى العربية'}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 active:bg-white/25 transition-colors font-sans text-sm text-white min-h-[44px]"
            >
              <Globe className="w-4 h-4" />
              {t.language}
            </button>
          </div>
        </header>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-20 sm:pb-24">
          <div
            className={`text-center transition-all duration-700 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="font-sans text-xs sm:text-sm text-white/80 tracking-wide mb-5 sm:mb-8 px-2">
              {t.trustBar}
            </p>
          </div>

          <div
            className={`text-center max-w-4xl transition-all duration-700 delay-200 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 sm:mb-4 leading-tight">
              {t.headline}
            </h1>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 mb-2 sm:mb-3 leading-tight">
              {t.headlineSub}
            </h2>
            <p className="font-serif text-lg sm:text-xl md:text-2xl font-medium mb-5 sm:mb-8" style={{ color: 'hsl(43 74% 49%)' }}>
              {t.headlineEdition}
            </p>
          </div>

          <div
            className={`text-center max-w-2xl transition-all duration-700 delay-400 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="font-sans text-base sm:text-lg text-white/70 leading-relaxed mb-5 sm:mb-8 px-2">
              {t.subheadline}
            </p>

            <div className="flex items-start sm:items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 mb-6 sm:mb-10 mx-auto max-w-lg text-left">
              <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" style={{ color: 'hsl(43 74% 49%)' }} />
              <span className="font-sans text-sm sm:text-base text-white/90">{t.clarifier}</span>
            </div>

            <div>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-sans font-semibold text-base sm:text-lg transition-all duration-200 hover:brightness-110 active:scale-[0.98] min-h-[48px]"
                style={{ backgroundColor: 'hsl(43 74% 49%)', color: 'hsl(220 55% 12%)' }}
              >
                {t.heroCta}
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700 ${
          heroLoaded ? 'opacity-100' : 'opacity-0'
        } hidden sm:block`}>
          <button
            onClick={scrollToForm}
            className="flex flex-col items-center gap-2 text-white/40 animate-bounce cursor-pointer hover:text-white/60 transition-colors"
          >
            <span className="text-xs font-sans tracking-wider uppercase">{t.scrollText}</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-5 sm:mb-8" style={{ color: 'hsl(220 55% 12%)' }}>
              {t.contentTitle}
            </h3>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="font-sans text-base sm:text-xl text-gray-600 leading-relaxed text-center mb-10 sm:mb-16">
              {t.contentIntro}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="font-sans text-base sm:text-lg text-gray-700 font-medium text-center mb-5 sm:mb-8">
              {t.contentFamilies}
            </p>
          </AnimatedSection>

          <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-16">
            {[t.familyPoint1, t.familyPoint2, t.familyPoint3].map((point, index) => (
              <AnimatedSection key={index} delay={300 + index * 100}>
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" strokeWidth={2.5} />
                  </div>
                  <span className="font-sans text-base sm:text-lg text-gray-700">{point}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={600}>
            <div className="text-center mb-5 sm:mb-8">
              <p className="font-sans text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">{t.contentResearch}</p>
              <p className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold whitespace-pre-line leading-relaxed" style={{ color: 'hsl(220 50% 20%)' }}>
                {t.contentCountries}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={700}>
            <p className="font-sans text-base sm:text-xl text-gray-600 text-center leading-relaxed">
              {t.contentConfusing}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-32" style={{ backgroundColor: 'hsl(45 30% 97%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <p className="font-sans text-base sm:text-lg font-semibold text-center mb-8 sm:mb-12" style={{ color: 'hsl(220 50% 20%)' }}>
              {t.guideExplains}
            </p>
          </AnimatedSection>

          <div className="space-y-4 sm:space-y-6">
            {[t.guidePoint1, t.guidePoint2, t.guidePoint3, t.guidePoint4, t.guidePoint5].map((point, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsla(43, 74%, 49%, 0.15)' }}>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'hsl(43 74% 49%)' }} strokeWidth={2} />
                  </div>
                  <span className="font-sans text-base sm:text-lg text-gray-700 pt-1 sm:pt-2">{point}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={800}>
            <div className="mt-10 sm:mt-16 text-center">
              <p className="font-serif text-2xl sm:text-3xl font-semibold" style={{ color: 'hsl(220 55% 12%)' }}>
                {t.clearAnswers}
              </p>
              <p className="font-serif text-xl sm:text-2xl mt-2" style={{ color: 'hsl(220 40% 35%)' }}>
                {t.noPressure}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-32 bg-white" ref={formRef} id="guide-form">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-xl border border-gray-100" style={{ backgroundColor: 'hsl(220 55% 12%)' }}>
              <h4 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-white text-center mb-2 sm:mb-3">
                {t.formTitle}
              </h4>
              <p className="font-sans text-sm sm:text-base text-white/70 text-center mb-6 sm:mb-8">
                {t.formSubtitle}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block font-sans text-sm font-medium text-white/80 mb-1.5 sm:mb-2">
                    {t.fullName}
                  </label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full h-12 sm:h-14 px-4 sm:px-5 bg-white/10 border-white/20 text-white text-base placeholder:text-white/50 focus:border-gold focus:ring-gold rounded-xl"
                    placeholder={isRtl ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  />
                </div>

                <div>
                  <label className="block font-sans text-sm font-medium text-white/80 mb-1.5 sm:mb-2">
                    {t.phone}
                  </label>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    variant="dark"
                    placeholder="5XX XXX XXXX"
                    required
                  />
                </div>

                {error && (
                  <p className="font-sans text-sm text-red-400 text-center" role="alert">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 sm:h-14 text-base sm:text-lg font-sans font-semibold rounded-xl group active:scale-[0.98] transition-all"
                  style={{ backgroundColor: 'hsl(43 74% 49%)', color: 'hsl(220 55% 12%)' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.submitting}
                    </span>
                  ) : (
                    <>
                      {t.buttonText}
                      <ArrowRight className={`${isRtl ? 'mr-2 rotate-180' : 'ml-2'} w-5 h-5 transition-transform ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 text-center">
                <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed">
                  {t.noSpam} {t.noSales}<br />
                  <span className="text-white/70">{t.justInfo}</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 sm:w-6 sm:h-6" style={{ fill: 'hsl(43 74% 49%)', color: 'hsl(43 74% 49%)' }} />
                ))}
              </div>
              <p className="font-sans text-gray-600 text-base sm:text-lg leading-relaxed mb-1.5 sm:mb-2">
                {t.trustStripText}
              </p>
              <p className="font-sans text-gray-400 text-xs sm:text-sm">
                {t.trustStripAttribution}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="py-10 sm:py-16" style={{ backgroundColor: 'hsl(220 55% 12%)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-sans text-sm sm:text-base text-white/50 leading-relaxed">
            {t.footerLine1}<br />
            {t.footerLine2}<br />
            {t.footerLine3}
          </p>
        </div>
      </footer>
    </div>
  );
}
