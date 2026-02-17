'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Al-Rashid',
    location: 'Riyadh, Saudi Arabia',
    role: 'Business Owner',
    content: 'Jane made what seemed like an impossible process completely manageable. Her expertise and attention to detail gave us confidence throughout our journey to Canada.',
    rating: 5,
  },
  {
    name: 'Fatima Hassan',
    location: 'Dubai, UAE',
    role: 'Healthcare Executive',
    content: 'The level of professionalism and personal attention we received was exceptional. Our family is now settled in Toronto, and we could not be happier with our decision.',
    rating: 5,
  },
  {
    name: 'Mohammed Al-Sayed',
    location: 'Kuwait City, Kuwait',
    role: 'Investment Manager',
    content: 'From the first consultation to landing in Canada, every step was handled with precision. Jane\'s team truly understands the needs of international clients.',
    rating: 5,
  },
];

const partners = [
  { name: 'IRCC', subtitle: 'Immigration Canada' },
  { name: 'ICCRC', subtitle: 'Regulatory Council' },
  { name: 'CAPIC', subtitle: 'Professional Association' },
  { name: 'CBA', subtitle: 'Bar Association' },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover-lift transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center gap-1 mb-3 sm:mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" style={{ fill: 'hsl(43 74% 49%)', color: 'hsl(43 74% 49%)' }} />
        ))}
      </div>

      <div className="relative mb-4 sm:mb-6">
        <Quote className="absolute -top-2 -left-2 w-7 h-7 sm:w-8 sm:h-8 text-gold/20" style={{ color: 'hsla(43, 74%, 49%, 0.2)' }} />
        <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed pl-4">
          {testimonial.content}
        </p>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-gray-100">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsla(220, 50%, 20%, 0.1)' }}>
          <span className="font-serif text-base sm:text-lg font-semibold text-navy" style={{ color: 'hsl(220 50% 20%)' }}>
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h4 className="font-serif font-semibold text-sm sm:text-base text-navy-dark" style={{ color: 'hsl(220 55% 12%)' }}>
            {testimonial.name}
          </h4>
          <p className="font-sans text-xs sm:text-sm text-gray-500">
            {testimonial.role} - {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: partnersRef, isVisible: partnersVisible } = useScrollAnimation();

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-10 sm:mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold font-sans text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4" style={{ color: 'hsl(43 74% 49%)' }}>
            Client Success
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy-dark mb-4 sm:mb-6" style={{ color: 'hsl(220 55% 12%)' }}>
            Trusted by Families Worldwide
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full animate-line-grow" style={{ backgroundColor: 'hsl(43 74% 49%)' }} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-12 sm:mb-20">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>

        <div
          ref={partnersRef}
          className={`text-center transition-all duration-700 ${
            partnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-sm text-gray-400 uppercase tracking-widest mb-6 sm:mb-8">
            Recognized By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className={`text-center hover-lift transition-all duration-500 ${
                  partnersVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="font-serif text-xl sm:text-2xl font-semibold text-navy/30" style={{ color: 'hsla(220, 50%, 20%, 0.3)' }}>
                  {partner.name}
                </div>
                <div className="font-sans text-xs text-gray-400 mt-1">
                  {partner.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
