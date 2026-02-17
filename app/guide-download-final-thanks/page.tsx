'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, CheckCircle2, MessageCircle } from 'lucide-react';
import { finalThanksTranslations, Language } from '@/lib/translations';

export default function GuideDownloadFinalThanksPage() {
  const [lang, setLang] = useState<Language>('en');
  const [loaded, setLoaded] = useState(false);
  const isRtl = lang === 'ar';
  const t = finalThanksTranslations[lang];

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <div
      className={`min-h-screen-safe flex flex-col ${isRtl ? 'rtl' : 'ltr'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_55%_8%/0.92)] via-[hsl(220_55%_10%/0.88)] to-[hsl(220_55%_12%/0.96)]" />
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

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-lg w-full text-center -mt-8 sm:-mt-16">
          <div
            className={`transition-all duration-1000 ease-out ${
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/15 backdrop-blur-sm border border-green-400/20 flex items-center justify-center mx-auto mb-6 sm:mb-10">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ease-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 sm:mb-5 leading-tight">
              {t.heroHeadline}
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-10 sm:mb-16">
              {t.heroSubheadline}
            </p>
          </div>

          <div
            className={`transition-all duration-1000 ease-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '550ms' }}
          >
            <div className="rounded-xl sm:rounded-2xl bg-white/[0.07] backdrop-blur-sm border border-white/10 p-5 sm:p-8 md:p-10">
              <p className="font-sans text-white/50 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                {t.instruction}
              </p>

              <p
                className="font-sans text-base sm:text-lg font-medium tracking-wide mb-4 sm:mb-6"
                style={{ color: 'hsl(43 74% 49%)' }}
              >
                {t.whatsappNumber}
              </p>

              <a
                href="https://wa.link/stibjt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-sans font-semibold text-sm sm:text-base transition-all duration-200 hover:brightness-110 active:scale-[0.98] min-h-[48px]"
                style={{
                  backgroundColor: '#25D366',
                  color: 'white',
                }}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                {t.whatsappButton}
              </a>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ease-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '850ms' }}
          >
            <p className="font-serif text-base sm:text-lg text-white/30 mt-8 sm:mt-12 italic">
              {t.closing}
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-6 sm:py-8" />
    </div>
  );
}
