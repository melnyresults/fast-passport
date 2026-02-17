'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Shield, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen-safe flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-navy-dark" style={{ backgroundColor: 'hsl(220 55% 12%)' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_55%_12%)] via-[hsl(220_55%_12%/0.9)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_55%_12%)] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <div
              className={`mb-5 sm:mb-6 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/80 text-xs sm:text-sm font-sans">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Now accepting applications for 2025
              </span>
            </div>

            <h1
              className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-4 sm:mb-6 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Your Path to{' '}
              <span className="text-gold" style={{ color: 'hsl(43 74% 49%)' }}>
                Canadian
              </span>{' '}
              Citizenship
            </h1>

            <p
              className={`font-sans text-base sm:text-lg text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-xl transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Private advisory services for distinguished individuals seeking Canadian residency and citizenship through established investment immigration programs.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Button
                size="lg"
                className="bg-gold hover:bg-[hsl(43_80%_38%)] text-navy-dark font-sans font-medium px-6 sm:px-8 h-12 sm:h-11 group active:scale-[0.98] transition-all"
                style={{ backgroundColor: 'hsl(43 74% 49%)', color: 'hsl(220 55% 12%)' }}
              >
                Schedule Private Consultation
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 icon-hover">
                  <Shield className="w-5 h-5 text-gold" style={{ color: 'hsl(43 74% 49%)' }} strokeWidth={1.5} />
                </div>
                <span className="text-white/60 text-sm font-sans">100% Success Rate</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 icon-hover">
                  <Globe className="w-5 h-5 text-gold" style={{ color: 'hsl(43 74% 49%)' }} strokeWidth={1.5} />
                </div>
                <span className="text-white/60 text-sm font-sans">185+ Countries Access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 icon-hover">
                  <Clock className="w-5 h-5 text-gold" style={{ color: 'hsl(43 74% 49%)' }} strokeWidth={1.5} />
                </div>
                <span className="text-white/60 text-sm font-sans">18-24 Month Timeline</span>
              </div>
            </div>
          </div>

          <div
            className={`hidden lg:block transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-transparent rounded-3xl blur-2xl" style={{ background: 'linear-gradient(to bottom right, hsla(43, 74%, 49%, 0.2), transparent)' }} />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 animate-gentle-float">
                <div className="aspect-[3/4] max-w-[280px] mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 rounded-lg shadow-2xl">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 mb-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(43 74% 49%)" strokeWidth="2" />
                          <path d="M50 20 L55 40 L75 40 L60 52 L65 72 L50 60 L35 72 L40 52 L25 40 L45 40 Z" fill="hsl(43 74% 49%)" />
                        </svg>
                      </div>
                      <div className="text-white/90 text-xs tracking-widest uppercase mb-2">Canada</div>
                      <div className="text-white font-serif text-lg">Passport</div>
                      <div className="text-white/70 text-xs mt-1">Passeport</div>
                      <div className="absolute bottom-8 left-0 right-0">
                        <div className="w-20 h-1 bg-gold/50 mx-auto rounded" style={{ backgroundColor: 'hsla(43, 74%, 49%, 0.5)' }} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-xl transform rotate-6 -z-10" />
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center text-white/60 text-sm">
                    <span>Global Mobility Rank</span>
                    <span className="text-gold font-semibold" style={{ color: 'hsl(43 74% 49%)' }}>#8 Worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
