'use client';

import { BookOpen, MapPin, Phone, Mail } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Investment Immigration', href: '#' },
    { label: 'Business Immigration', href: '#' },
    { label: 'Family Sponsorship', href: '#' },
    { label: 'Express Entry', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Process', href: '#process' },
    { label: 'Success Stories', href: '#testimonials' },
    { label: 'Contact', href: '#' },
  ],
  resources: [
    { label: 'Immigration Guide', href: '#' },
    { label: 'Eligibility Check', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Blog', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-dark pt-12 sm:pt-20 pb-6 sm:pb-8" style={{ backgroundColor: 'hsl(220 55% 12%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 pb-10 sm:pb-12 border-b border-white/10">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gold" style={{ color: 'hsl(43 74% 49%)' }} strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-serif text-lg sm:text-xl font-semibold text-white">
                  Fast Passport
                </span>
                <span className="block text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold" style={{ color: 'hsl(43 74% 49%)' }}>
                  Boutique
                </span>
              </div>
            </a>
            <p className="font-sans text-white/60 text-sm leading-relaxed mb-5 sm:mb-6 max-w-sm">
              Premium Canadian immigration advisory services for distinguished individuals and families seeking a new chapter in Canada.
            </p>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-sans text-sm">Toronto | Dubai | Riyadh</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-sans text-sm">+1 (416) 555-0123</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Mail className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-sans text-sm break-all">jane@fastpassportboutique.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-xs sm:text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-xs sm:text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-xs sm:text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs sm:text-sm text-white/40">
            2025 Fast Passport Boutique. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="font-sans text-xs sm:text-sm text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-xs sm:text-sm text-white/40 hover:text-white/60 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="font-sans text-xs sm:text-sm text-white/40 hover:text-white/60 transition-colors">
              RCIC License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
