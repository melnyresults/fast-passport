'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import {
  FileText,
  Search,
  Send,
  Clock,
  CheckCircle2,
  Stamp
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Initial Consultation',
    description: 'Private assessment of your profile, goals, and eligibility for Canadian immigration programs.',
    duration: 'Week 1',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Document Preparation',
    description: 'Comprehensive gathering and preparation of all required documentation with our support.',
    duration: 'Weeks 2-6',
  },
  {
    number: '03',
    icon: Send,
    title: 'Application Submission',
    description: 'Strategic submission of your application through the optimal immigration pathway.',
    duration: 'Week 7',
  },
  {
    number: '04',
    icon: Clock,
    title: 'Processing Period',
    description: 'Active monitoring and management of your application with regular status updates.',
    duration: 'Months 3-18',
  },
  {
    number: '05',
    icon: Stamp,
    title: 'Approval & Landing',
    description: 'Confirmation of permanent residency and coordination of your arrival in Canada.',
    duration: 'Month 18-20',
  },
  {
    number: '06',
    icon: CheckCircle2,
    title: 'Citizenship Eligibility',
    description: 'After meeting residency requirements, apply for full Canadian citizenship.',
    duration: 'Year 3-5',
  },
];

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-4 sm:gap-8 ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
        <div className={`bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover-lift ${isEven ? 'lg:ml-auto' : 'lg:mr-auto'} max-w-md`}>
          <div className={`flex items-center gap-3 mb-2 sm:mb-3 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
            <span className="text-gold font-serif text-xl sm:text-2xl font-semibold" style={{ color: 'hsl(43 74% 49%)' }}>
              {step.number}
            </span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cream flex items-center justify-center icon-hover" style={{ backgroundColor: 'hsl(45 30% 97%)' }}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-navy" style={{ color: 'hsl(220 50% 20%)' }} strokeWidth={1.5} />
            </div>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-navy-dark mb-1.5 sm:mb-2" style={{ color: 'hsl(220 55% 12%)' }}>
            {step.title}
          </h3>
          <p className="font-sans text-gray-600 text-sm leading-relaxed mb-2 sm:mb-3">
            {step.description}
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-medium" style={{ backgroundColor: 'hsla(220, 50%, 20%, 0.05)', color: 'hsl(220 50% 20%)' }}>
            {step.duration}
          </span>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full bg-gold shadow-lg transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-0'}`} style={{ backgroundColor: 'hsl(43 74% 49%)' }} />
        {index < steps.length - 1 && (
          <div className="w-0.5 h-24 bg-gray-200 mt-2" />
        )}
      </div>

      <div className="flex-1 hidden lg:block" />
    </div>
  );
}

export function ProcessSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="process" className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-20 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold font-sans text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4" style={{ color: 'hsl(43 74% 49%)' }}>
            Our Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy-dark mb-4 sm:mb-6" style={{ color: 'hsl(220 55% 12%)' }}>
            A Clear Path Forward
          </h2>
          <p className="font-sans text-gray-600 text-base sm:text-lg">
            We guide you through every step of your immigration journey with precision and care.
          </p>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mt-5 sm:mt-6 animate-line-grow" style={{ backgroundColor: 'hsl(43 74% 49%)' }} />
        </div>

        <div className="space-y-6 sm:space-y-8 lg:space-y-0">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
