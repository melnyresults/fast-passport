'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { generateEventId, sendCAPIEvent } from '@/lib/meta-capi';

declare global {
  interface Window {
    fbq: any;
  }
}

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const eventId = generateEventId();

    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView', {}, { eventID: eventId });
    }

    sendCAPIEvent({
      event_name: 'PageView',
      event_id: eventId,
    });
  }, [pathname, searchParams]);

  return null;
}
