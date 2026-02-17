'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Check,
  Star,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText,
  Stethoscope,
  FileCheck,
  AlertTriangle,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PhoneInput } from '@/components/phone-input';
import { supabase } from '@/lib/supabase';
import { generateEventId, sendCAPIEvent } from '@/lib/meta-capi';
import { thanksTranslations, Language } from '@/lib/translations';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function GuideDownloadThanksPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>('en');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [heroLoaded, setHeroLoaded] = useState(false);

  const t = thanksTranslations[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

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
        .from('consultation_bookings')
        .insert({
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          additional_info: additionalInfo?.trim() || null,
          language: lang,
          source: 'guide-download-thanks',
        });

      if (submitError) {
        console.error('Supabase error:', submitError);
        setIsSubmitting(false);
        setError(t.errorMessage);
        return;
      }

      const eventId = generateEventId();
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Schedule', {}, { eventID: eventId });
      }
      sendCAPIEvent({
        event_name: 'Schedule',
        event_id: eventId,
        first_name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });

      router.push('/guide-download-final-thanks');
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
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1920&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_55%_8%/0.88)] via-[hsl(220_55%_10%/0.82)] to-[hsl(220_55%_12%/0.95)]" />
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

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-16 sm:pb-24">
          <div
            className={`transition-all duration-1000 ease-out ${
              heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div
              className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full mb-6 sm:mb-10 backdrop-blur-sm border border-green-400/20"
              style={{ backgroundColor: 'hsla(142, 71%, 45%, 0.15)' }}
            >
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span className="font-sans text-xs sm:text-sm font-medium text-green-300 tracking-wide">
                {t.statusBar}
              </span>
            </div>
          </div>

          <div
            className={`text-center max-w-3xl transition-all duration-1000 ease-out ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 sm:mb-5 leading-tight">
              {t.heroHeadline}
            </h1>
            <p
              className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-10 sm:mb-20"
              style={{ color: 'hsl(43 74% 49%)' }}
            >
              {t.heroSubheadline}
            </p>
          </div>

          <div
            className={`text-center max-w-2xl transition-all duration-1000 ease-out ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10">
              <p className="font-sans text-base sm:text-lg md:text-xl text-white/60">
                {t.valueProposition}
              </p>
              <div className="hidden sm:block w-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <p className="font-sans text-base sm:text-lg md:text-xl text-white font-medium">
                {t.valueProposition2}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
            heroLoaded ? 'opacity-100' : 'opacity-0'
          } hidden sm:block`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="flex flex-col items-center gap-2 text-white/30 animate-bounce">
            <span className="text-xs font-sans tracking-[0.2em] uppercase">
              Scroll
            </span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      <section className="min-h-[40vh] sm:min-h-[60vh] flex items-center bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center py-14 sm:py-24">
          <AnimatedSection>
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-gray-400 mb-4 sm:mb-6">
              {t.transitionLine}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div
              className="w-12 sm:w-16 h-px mx-auto mb-4 sm:mb-6 origin-left"
              style={{ backgroundColor: 'hsl(43 74% 49%)' }}
            />
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <p
              className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug"
              style={{ color: 'hsl(220 55% 12%)' }}
            >
              {t.transitionLine2}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section
        className="py-16 sm:py-24 lg:py-40"
        style={{ backgroundColor: 'hsl(45 30% 97%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <h2
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-10 sm:mb-20"
              style={{ color: 'hsl(220 55% 12%)' }}
            >
              {t.whyTitle}
            </h2>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto mb-10 sm:mb-14">
            <AnimatedSection delay={100}>
              <p className="font-sans text-base sm:text-xl text-gray-500 text-center mb-2 sm:mb-3">
                {t.whyIntro}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <p className="font-sans text-base sm:text-xl text-gray-800 font-medium text-center mb-6 sm:mb-10">
                {t.whyIntro2}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <p className="font-sans text-base sm:text-lg text-gray-600 text-center">
                {t.whyIntro3}
              </p>
            </AnimatedSection>
          </div>

          <div className="space-y-3 sm:space-y-5 max-w-2xl mx-auto mb-12 sm:mb-20">
            {[t.benefit1, t.benefit2, t.benefit3, t.benefit4, t.benefit5].map(
              (benefit, index) => (
                <AnimatedSection key={index} delay={400 + index * 150}>
                  <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm border border-gray-100">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                </AnimatedSection>
              )
            )}
          </div>

          <AnimatedSection delay={1200}>
            <div className="max-w-xl mx-auto text-center">
              <p
                className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3"
                style={{ color: 'hsl(220 55% 12%)' }}
              >
                {t.notSalesCall}
              </p>
              <p className="font-sans text-base sm:text-lg text-gray-500 leading-relaxed">
                {t.notSalesCallDesc}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="max-w-[280px] sm:max-w-sm mx-auto mb-12 sm:mb-16 relative">
              <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <img
                  src="https://i.ibb.co/SwHmvMpz/ch-9-scaled.jpg"
                  alt="Carina - Consultation Specialist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'hsla(43, 74%, 49%, 0.15)',
                    }}
                  >
                    <Sparkles
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{ color: 'hsl(43 74% 49%)' }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-serif font-semibold text-base sm:text-lg"
                      style={{ color: 'hsl(220 55% 12%)' }}
                    >
                      Carina
                    </p>
                    <p className="font-sans text-xs text-gray-400 tracking-wider uppercase">
                      Specialist
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <h3
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4 sm:mb-6"
              style={{ color: 'hsl(220 55% 12%)' }}
            >
              {t.expertTitle}
            </h3>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="font-sans text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed text-center max-w-xl mx-auto mb-8 sm:mb-12">
              {t.expertIntro}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <p className="font-sans text-sm font-semibold text-gray-400 uppercase tracking-wider text-center mb-4 sm:mb-6">
              {t.expertUnderstandsTitle}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={500}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto mb-10 sm:mb-14">
              {[
                { icon: FileText, text: t.expertPoint1 },
                { icon: Stethoscope, text: t.expertPoint2 },
                { icon: FileCheck, text: t.expertPoint3 },
                { icon: AlertTriangle, text: t.expertPoint4 },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'hsla(43, 74%, 49%, 0.12)',
                    }}
                  >
                    <item.icon
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      style={{ color: 'hsl(43 74% 49%)' }}
                    />
                  </div>
                  <span className="font-sans text-gray-600 text-xs sm:text-sm">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <p
              className="font-serif text-lg sm:text-xl md:text-2xl font-medium text-center italic"
              style={{ color: 'hsl(220 50% 25%)' }}
            >
              {t.expertClosing}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section
        className="py-16 sm:py-24 lg:py-40"
        style={{ backgroundColor: 'hsl(220 55% 12%)' }}
      >
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-8 sm:mb-10">
              <p className="font-sans text-xs sm:text-sm font-medium text-white/40 uppercase tracking-wider mb-4 sm:mb-5">
                {t.formBestFor}
              </p>
              <div className="flex flex-col items-center gap-2.5 sm:gap-3">
                {[t.bestFor1, t.bestFor2, t.bestFor3].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Check
                        className="w-3 h-3 text-white/60"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="font-sans text-xs sm:text-sm text-white/60">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12 bg-white shadow-2xl">
              <h4
                className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-center"
                style={{ color: 'hsl(220 55% 12%)' }}
              >
                {t.formTitle}
              </h4>
              <p className="font-sans text-sm sm:text-base text-gray-400 text-center mb-6 sm:mb-10">
                {t.formSubtitle}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-600 mb-1.5 sm:mb-2">
                    {t.fullName}
                  </label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full h-12 sm:h-14 px-4 sm:px-5 border-gray-200 rounded-xl text-gray-800 text-base focus:ring-2 focus:ring-offset-0"
                    placeholder={
                      isRtl
                        ? '\u0623\u062F\u062E\u0644 \u0627\u0633\u0645\u0643 \u0627\u0644\u0643\u0627\u0645\u0644'
                        : 'Enter your full name'
                    }
                  />
                </div>

                <div>
                  <label className="block font-sans text-sm font-medium text-gray-600 mb-1.5 sm:mb-2">
                    {t.email}
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 sm:h-14 px-4 sm:px-5 border-gray-200 rounded-xl text-gray-800 text-base focus:ring-2 focus:ring-offset-0"
                    placeholder={
                      isRtl
                        ? '\u0623\u062F\u062E\u0644 \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A'
                        : 'Enter your email address'
                    }
                  />
                </div>

                <div>
                  <label className="block font-sans text-sm font-medium text-gray-600 mb-1.5 sm:mb-2">
                    {t.phone}
                  </label>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    variant="light"
                    placeholder="5XX XXX XXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block font-sans text-sm font-medium text-gray-600 mb-1.5 sm:mb-2">
                    {t.additionalInfo}
                  </label>
                  <Textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-gray-200 rounded-xl resize-none text-gray-800 text-base focus:ring-2 focus:ring-offset-0"
                    rows={3}
                    placeholder={t.additionalInfoPlaceholder}
                  />
                </div>

                {error && (
                  <p
                    className="font-sans text-sm text-red-600 text-center"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 sm:h-14 text-base sm:text-lg font-sans font-semibold rounded-xl group transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
                  style={{
                    backgroundColor: 'hsl(43 74% 49%)',
                    color: 'hsl(220 55% 12%)',
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.submitting}
                    </span>
                  ) : (
                    <>
                      {t.buttonText}
                      <ArrowRight
                        className={`${
                          isRtl ? 'mr-2 rotate-180' : 'ml-2'
                        } w-5 h-5 transition-transform ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                      />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 sm:mt-10 pt-5 sm:pt-6 border-t border-gray-100 text-center">
                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {t.reassurance1} {t.reassurance2}
                  <br />
                  <span className="text-gray-500">{t.reassurance3}</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 sm:py-20 lg:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-4 sm:mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    style={{
                      fill: 'hsl(43 74% 49%)',
                      color: 'hsl(43 74% 49%)',
                    }}
                  />
                ))}
              </div>
              <p className="font-sans text-gray-500 text-base sm:text-lg leading-relaxed italic max-w-lg mx-auto">
                {t.trustStripText}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer
        className="py-12 sm:py-20"
        style={{ backgroundColor: 'hsl(220 55% 12%)' }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-sans text-sm sm:text-base text-white/40 leading-relaxed mb-2">
            {t.footerLine1}
          </p>
          <p className="font-sans text-sm sm:text-base text-white/60 font-medium">
            {t.footerLine2}
          </p>
        </div>
      </footer>
    </div>
  );
}
