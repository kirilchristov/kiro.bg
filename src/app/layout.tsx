import {ReactNode} from 'react';
import {Provider as ChakraThemeProvider} from '@/components/ui/provider';
import styles from './layout.module.scss';
import Header from '../components/Header/Header';
import {Metadata} from '../components/Metadata/Metadata';
import {SearchProvider} from '@/components/Search/SearchProvider/SearchProvider';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {GoogleAnalytics} from '@next/third-parties/google';

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-G81R4R8ZKX" />
      <Metadata />
      <body className={styles.appContainer}>
        <ChakraThemeProvider>
          <SearchProvider>
            <Header />
            {children}
          </SearchProvider>
        </ChakraThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
