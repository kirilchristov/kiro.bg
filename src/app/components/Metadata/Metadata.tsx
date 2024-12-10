import Head from 'next/head';

export const Metadata = () => {
  return (
    <Head>
      {/* Global Metadata */}
      <title>Kiro.bg</title>
      <meta name="description" content="Блог на Кирил Христов" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="Kiro.bg" />
      <meta property="og:description" content="Блог на Кирил Христов" />
      <meta property="og:image" content="/meta_image.png" />
      <meta property="og:type" content="website" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Kiro.bg" />
      <meta name="twitter:description" content="Блог на Кирил Христов" />
      <meta name="twitter:image" content="/meta_image.png" />

      {/* Favicon Links */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/android-chrome-512x512.png"
      />
    </Head>
  );
};
