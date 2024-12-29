'use server';
import {ReactNode} from 'react';
import {Provider} from '@/components/ui/provider';
import styles from './layout.module.scss';
import Header from '../components/Header/Header';
import {Metadata} from '../components/Metadata/Metadata';
import {SearchProvider} from '@/components/Search/SearchProvider/SearchProvider';
import {SpeedInsights} from '@vercel/speed-insights/next';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';

export default async function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics GA_MEASUREMENT_ID="G-G81R4R8ZKX" />
      <Metadata />
      <body className={styles.appContainer}>
        <Provider>
          <>
            <Provider>
              <SearchProvider>
                <Header />
                {children}
              </SearchProvider>
            </Provider>
          </>
        </Provider>
        <SpeedInsights />
      </body>
    </html>
  );
}
