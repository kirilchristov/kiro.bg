import Home from './components/Home/Home';
import {Suspense} from 'react';

export const generateMetadata = async () => {
  return {
    title: 'Kiro.bg - Блог на Кирил Христов',
    description: 'Интернет архив от глупости и закачки.',
    openGraph: {
      title: 'Kiro.bg - Блог на Кирил Христов',
      description: 'Интернет архив от глупости и закачки.',
      url: 'https://kiro.bg',
      siteName: 'Kiro.bg',
      images: [
        {
          url: '/meta_image.png',
          width: 1200,
          height: 630,
          alt: 'Kiro Blog Default Image',
        },
      ],
      locale: 'bg_BG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Kiro.bg - Блог на Кирил Христов',
      description: 'Интернет архив от глупости и закачки.',
      images: ['/meta_image.png'],
    },
  };
};

export default function Page() {
  return (
    <Suspense fallback={<div>Зареждам...</div>}>
      <Home />
    </Suspense>
  );
}
