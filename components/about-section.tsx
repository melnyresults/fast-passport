'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Award, BookOpen, Users, MapPin } from 'lucide-react';

const credentials = [
  {
    icon: Award,
    title: 'Licensed RCIC',
    description: 'Regulated Canadian Immigration Consultant',
  },
  {
    icon: BookOpen,
    title: '15+ Years Experience',
    description: 'Specialized in investment immigration',
  },
  {
    icon: Users,
    title: '500+ Families',
    description: 'Successfully relocated to Canada',
  },
  {
    icon: MapPin,
    title: 'Global Network',
    description: 'Offices in Dubai, Riyadh, and Toronto',
  },
];

export function AboutSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 bg-cream" style={{ backgroundColor: 'hsl(45 30% 97%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 to-navy/10 rounded-2xl blur-2xl" style={{ background: 'linear-gradient(to bottom right, hsla(43, 74%, 49%, 0.3), hsla(220, 50%, 20%, 0.1))' }} />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                  alt="Jane Mitchell - Senior Immigration Advisor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" style={{ background: 'linear-gradient(to top, hsla(220, 55%, 12%, 0.6), transparent, transparent)' }} />
              </div>
              <div className="absolute -bottom-4 -right-3 sm:-bottom-6 sm:-right-6 bg-white rounded-xl p-3 sm:p-4 shadow-xl">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold flex items-center justify-center" style={{ backgroundColor: 'hsl(43 74% 49%)' }}>
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-serif text-lg sm:text-xl font-semibold text-navy" style={{ color: 'hsl(220 50% 20%)' }}>100%</div>
                    <div className="font-sans text-xs text-gray-500">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={sectionRef}>
            <span
              className={`inline-block text-gold font-sans text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4 transition-all duration-700 ${
                sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ color: 'hsl(43 74% 49%)' }}
            >
              Meet Your Advisor
            </span>
            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy-dark mb-4 sm:mb-6 transition-all duration-700 delay-100 ${
                sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ color: 'hsl(220 55% 12%)' }}
            >
              Jane Mitchell
            </h2>
            <div
              className={`w-24 h-1 bg-gold rounded-full mb-4 sm:mb-6 transition-all duration-700 delay-200 ${
                sectionVisible ? 'animate-line-grow' : 'scale-x-0'
              }`}
              style={{ backgroundColor: 'hsl(43 74% 49%)', transformOrigin: 'left' }}
            />
            <p
              className={`font-sans text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 transition-all duration-700 delay-300 ${
                sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              As a licensed RCIC with over 15 years of experience, I specialize in helping high-net-worth individuals and their families navigate the Canadian immigration system. My approach combines deep regulatory expertise with personalized service to ensure every client achieves their goals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {credentials.map((credential, index) => {
                const Icon = credential.icon;
                return (
                  <div
                    key={credential.title}
                    className={`flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-white/50 border border-white transition-all duration-700 ${
                      sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0 icon-hover" style={{ backgroundColor: 'hsla(220, 50%, 20%, 0.05)' }}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-navy" style={{ color: 'hsl(220 50% 20%)' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-sm sm:text-base text-navy-dark" style={{ color: 'hsl(220 55% 12%)' }}>
                        {credential.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-gray-500">
                        {credential.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
