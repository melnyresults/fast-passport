'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq: any;
  }
}

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.fbq === 'undefined') return;

    window.fbq('track', 'PageView');
  }, [pathname, searchParams]);

  return null;
}
