'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import {
  Globe,
  Shield,
  Heart,
  GraduationCap,
  Building2,
  Banknote,
  MapPin,
  Users
} from 'lucide-react';

const benefits = [
  {
    icon: Globe,
    title: 'Global Mobility',
    description: 'Visa-free access to 185+ countries including USA, UK, EU, and more',
  },
  {
    icon: Banknote,
    title: 'Tax Advantages',
    description: 'No tax on worldwide income for non-residents',
  },
  {
    icon: Heart,
    title: 'Healthcare Excellence',
    description: 'Universal healthcare coverage for you and your family',
  },
  {
    icon: GraduationCap,
    title: 'World-Class Education',
    description: 'Access to top-ranked universities at local tuition rates',
  },
  {
    icon: Shield,
    title: 'Political Stability',
    description: 'One of the safest and most stable democracies globally',
  },
  {
    icon: Building2,
    title: 'Business Opportunities',
    description: 'Access to North American markets and USMCA benefits',
  },
  {
    icon: MapPin,
    title: 'Quality of Life',
    description: 'Consistently ranked among the best countries to live',
  },
  {
    icon: Users,
    title: 'Family Security',
    description: 'Include spouse and children in your application',
  },
];

function BenefitCard({
  benefit,
  index
}: {
  benefit: typeof benefits[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const Icon = benefit.icon;

  return (
    <div
      ref={ref}
      className={`group p-5 sm:p-6 rounded-xl bg-white border border-gray-100 hover-lift transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-cream flex items-center justify-center mb-3 sm:mb-4 icon-hover" style={{ backgroundColor: 'hsl(45 30% 97%)' }}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-navy" style={{ color: 'hsl(220 50% 20%)' }} strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-lg sm:text-xl font-semibold text-navy-dark mb-1.5 sm:mb-2" style={{ color: 'hsl(220 55% 12%)' }}>
        {benefit.title}
      </h3>
      <p className="font-sans text-gray-600 text-sm leading-relaxed">
        {benefit.description}
      </p>
    </div>
  );
}

export function BenefitsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="why-canada" className="py-16 sm:py-24 lg:py-32 bg-off-white" style={{ backgroundColor: 'hsl(40 20% 98%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-10 sm:mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold font-sans text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4" style={{ color: 'hsl(43 74% 49%)' }}>
            Why Canada
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy-dark mb-4 sm:mb-6" style={{ color: 'hsl(220 55% 12%)' }}>
            The World&apos;s Most Desirable Passport
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full animate-line-grow" style={{ backgroundColor: 'hsl(43 74% 49%)' }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>

        <div className="mt-10 sm:mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-8 px-5 sm:px-8 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="text-center">
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-navy" style={{ color: 'hsl(220 50% 20%)' }}>185+</div>
              <div className="font-sans text-xs sm:text-sm text-gray-500">Countries Access</div>
            </div>
            <div className="w-px h-10 sm:h-12 bg-gray-200" />
            <div className="text-center">
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-navy" style={{ color: 'hsl(220 50% 20%)' }}>#8</div>
              <div className="font-sans text-xs sm:text-sm text-gray-500">Global Rank</div>
            </div>
            <div className="w-px h-10 sm:h-12 bg-gray-200" />
            <div className="text-center">
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-navy" style={{ color: 'hsl(220 50% 20%)' }}>G7</div>
              <div className="font-sans text-xs sm:text-sm text-gray-500">Member Nation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
