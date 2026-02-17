'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+966', country: 'SA', label: 'Saudi Arabia' },
  { code: '+971', country: 'AE', label: 'UAE' },
  { code: '+974', country: 'QA', label: 'Qatar' },
  { code: '+973', country: 'BH', label: 'Bahrain' },
  { code: '+965', country: 'KW', label: 'Kuwait' },
  { code: '+968', country: 'OM', label: 'Oman' },
  { code: '+1', country: 'CA', label: 'Canada' },
  { code: '+1', country: 'US', label: 'United States' },
  { code: '+44', country: 'GB', label: 'United Kingdom' },
  { code: '+33', country: 'FR', label: 'France' },
  { code: '+49', country: 'DE', label: 'Germany' },
  { code: '+91', country: 'IN', label: 'India' },
  { code: '+92', country: 'PK', label: 'Pakistan' },
  { code: '+20', country: 'EG', label: 'Egypt' },
  { code: '+962', country: 'JO', label: 'Jordan' },
  { code: '+961', country: 'LB', label: 'Lebanon' },
  { code: '+90', country: 'TR', label: 'Turkey' },
  { code: '+61', country: 'AU', label: 'Australia' },
];

const FLAG_MAP: Record<string, string> = {
  SA: '\u{1F1F8}\u{1F1E6}',
  AE: '\u{1F1E6}\u{1F1EA}',
  QA: '\u{1F1F6}\u{1F1E6}',
  BH: '\u{1F1E7}\u{1F1ED}',
  KW: '\u{1F1F0}\u{1F1FC}',
  OM: '\u{1F1F4}\u{1F1F2}',
  CA: '\u{1F1E8}\u{1F1E6}',
  US: '\u{1F1FA}\u{1F1F8}',
  GB: '\u{1F1EC}\u{1F1E7}',
  FR: '\u{1F1EB}\u{1F1F7}',
  DE: '\u{1F1E9}\u{1F1EA}',
  IN: '\u{1F1EE}\u{1F1F3}',
  PK: '\u{1F1F5}\u{1F1F0}',
  EG: '\u{1F1EA}\u{1F1EC}',
  JO: '\u{1F1EF}\u{1F1F4}',
  LB: '\u{1F1F1}\u{1F1E7}',
  TR: '\u{1F1F9}\u{1F1F7}',
  AU: '\u{1F1E6}\u{1F1FA}',
};

interface PhoneInputProps {
  value: string;
  onChange: (fullPhone: string) => void;
  variant?: 'dark' | 'light';
  placeholder?: string;
  required?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  variant = 'dark',
  placeholder = '5XX XXX XXXX',
  required = false,
}: PhoneInputProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [localNumber, setLocalNumber] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    if (value) {
      const match = COUNTRY_CODES.findIndex((c) => value.startsWith(c.code));
      if (match >= 0) {
        setSelectedIndex(match);
        setLocalNumber(value.slice(COUNTRY_CODES[match].code.length).trim());
      } else {
        setLocalNumber(value);
      }
    }
    initializedRef.current = true;
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNumberChange = (raw: string) => {
    const cleaned = raw.replace(/[^\d\s()-]/g, '');
    setLocalNumber(cleaned);
    onChange(`${COUNTRY_CODES[selectedIndex].code} ${cleaned}`.trim());
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
    onChange(`${COUNTRY_CODES[index].code} ${localNumber}`.trim());
  };

  const selected = COUNTRY_CODES[selectedIndex];
  const isDark = variant === 'dark';

  return (
    <div className="relative flex" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 h-12 sm:h-14 rounded-l-xl border border-r-0 transition-colors flex-shrink-0 ${
          isDark
            ? 'bg-white/10 border-white/20 text-white hover:bg-white/15'
            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="text-base leading-none">{FLAG_MAP[selected.country]}</span>
        <span className="font-sans text-sm">{selected.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-white/60' : 'text-gray-400'}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto rounded-xl border shadow-xl z-50 ${
            isDark
              ? 'bg-[hsl(220_55%_16%)] border-white/20'
              : 'bg-white border-gray-200'
          }`}
        >
          {COUNTRY_CODES.map((item, index) => (
            <button
              key={`${item.country}-${item.code}`}
              type="button"
              onClick={() => handleSelect(index)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                index === selectedIndex
                  ? isDark
                    ? 'bg-white/10'
                    : 'bg-gray-100'
                  : ''
              } ${
                isDark
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="text-base leading-none">{FLAG_MAP[item.country]}</span>
              <span className="font-sans text-sm flex-1">{item.label}</span>
              <span className={`font-sans text-sm ${isDark ? 'text-white/50' : 'text-gray-400'}`}>
                {item.code}
              </span>
            </button>
          ))}
        </div>
      )}

      <input
        type="tel"
        inputMode="tel"
        value={localNumber}
        onChange={(e) => handleNumberChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={`flex-1 min-w-0 h-12 sm:h-14 px-4 sm:px-5 rounded-r-xl border text-base outline-none transition-colors ${
          isDark
            ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[hsl(43_74%_49%)]'
            : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[hsl(43_74%_49%)] focus:ring-2 focus:ring-offset-0'
        }`}
      />
    </div>
  );
}
