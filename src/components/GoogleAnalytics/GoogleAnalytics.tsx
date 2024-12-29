'use client';

/* eslint-disable no-unused-vars */
// components/GoogleAnalytics.tsx
import Script from 'next/script';
import {useEffect} from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import {Suspense} from 'react';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

// Separate component for handling route change tracking
function GoogleAnalyticsRouteTracker({
  GA_MEASUREMENT_ID,
}: {
  GA_MEASUREMENT_ID: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + searchParams.toString(),
      });
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return null;
}

export default function GoogleAnalytics({
  GA_MEASUREMENT_ID,
}: {
  GA_MEASUREMENT_ID: string;
}) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsRouteTracker GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
      </Suspense>
    </>
  );
}
