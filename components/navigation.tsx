'use client';

import { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Why Canada', href: '#why-canada' },
    { label: 'Our Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-navy flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <span className={`font-serif text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-navy-dark' : 'text-white'
              }`}>
                Fast Passport
              </span>
              <span className={`block text-[10px] sm:text-xs font-sans tracking-widest uppercase transition-colors duration-300 ${
                isScrolled ? 'text-gold' : 'text-gold-light'
              }`} style={{ color: isScrolled ? 'hsl(43 74% 49%)' : 'hsl(43 70% 65%)' }}>
                Boutique
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gold ${
                  isScrolled ? 'text-navy-light' : 'text-white/90'
                }`}
                style={{
                  color: isScrolled ? 'hsl(220 40% 35%)' : 'rgba(255,255,255,0.9)'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              className={`font-sans text-sm px-6 transition-all duration-300 ${
                isScrolled
                  ? 'bg-navy hover:bg-navy-dark text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
              }`}
              style={{
                backgroundColor: isScrolled ? 'hsl(220 50% 20%)' : 'rgba(255,255,255,0.1)',
              }}
            >
              Book Consultation
            </Button>
          </div>

          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg active:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" style={{ color: isScrolled ? 'hsl(220 50% 20%)' : 'white' }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: isScrolled ? 'hsl(220 50% 20%)' : 'white' }} />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg animate-fade-in">
            <div className="px-4 sm:px-6 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block font-medium py-3 px-3 rounded-lg active:bg-gray-50 transition-colors min-h-[44px] flex items-center"
                  style={{ color: 'hsl(220 55% 12%)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 pb-3">
                <Button className="w-full h-12 bg-navy hover:bg-navy-dark text-white" style={{ backgroundColor: 'hsl(220 50% 20%)' }}>
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
