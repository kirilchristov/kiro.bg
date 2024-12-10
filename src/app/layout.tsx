import {ReactNode} from 'react';
import {Provider} from '@/components/ui/provider';
import styles from './layout.module.scss';
import Header from './components/Header/Header';
import {GoogleTagManager} from '@next/third-parties/google';
import Footer from './components/Footer/Footer';
import {Metadata} from './components/Metadata/Metadata';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="G-G81R4R8ZKX" />
      <Metadata />
      <body className={styles.appContainer}>
        <Provider>
          <>
            <Header />
            {children}
            <Footer />
          </>
        </Provider>
      </body>
    </html>
  );
}
