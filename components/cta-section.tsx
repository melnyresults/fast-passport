'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-navy-dark relative overflow-hidden" style={{ backgroundColor: 'hsl(220 55% 12%)' }}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gold/10 rounded-full blur-3xl" style={{ backgroundColor: 'hsla(43, 74%, 49%, 0.1)' }} />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-navy/30 rounded-full blur-3xl" style={{ backgroundColor: 'hsla(220, 50%, 20%, 0.3)' }} />
      </div>

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block text-gold font-sans text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4" style={{ color: 'hsl(43 74% 49%)' }}>
              Begin Your Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 sm:mb-6">
              Ready to Secure Your Future in Canada?
            </h2>
            <p className="font-sans text-white/70 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Schedule a confidential consultation to discuss your goals and explore the best pathway to Canadian citizenship for you and your family.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-gold hover:bg-[hsl(43_80%_38%)] text-navy-dark font-sans font-medium px-6 sm:px-8 h-12 sm:h-11 group active:scale-[0.98] transition-all"
                style={{ backgroundColor: 'hsl(43 74% 49%)', color: 'hsl(220 55% 12%)' }}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-sans font-medium px-6 sm:px-8 h-12 sm:h-11 active:scale-[0.98] transition-all"
              >
                Download Brochure
              </Button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-8">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-5 sm:mb-6">
              Contact Information
            </h3>

            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsla(43, 74%, 49%, 0.2)' }}>
                  <Phone className="w-5 h-5 text-gold" style={{ color: 'hsl(43 74% 49%)' }} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-sans text-white/50 text-sm mb-1">Phone</div>
                  <div className="font-sans text-white text-sm sm:text-base">+1 (416) 555-0123</div>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsla(43, 74%, 49%, 0.2)' }}>
                  <Mail className="w-5 h-5 text-gold" style={{ color: 'hsl(43 74% 49%)' }} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-sans text-white/50 text-sm mb-1">Email</div>
                  <div className="font-sans text-white text-sm sm:text-base break-all">jane@fastpassportboutique.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsla(43, 74%, 49%, 0.2)' }}>
                  <MapPin className="w-5 h-5 text-gold" style={{ color: 'hsl(43 74% 49%)' }} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-sans text-white/50 text-sm mb-1">Offices</div>
                  <div className="font-sans text-white text-sm sm:text-base">Toronto | Dubai | Riyadh</div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
              <p className="font-sans text-white/50 text-xs sm:text-sm">
                All consultations are confidential and conducted in English or Arabic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
