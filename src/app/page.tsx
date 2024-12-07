import Home from './home/Home';

// Metadata function
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
          url: '', //  TODO: Create a default image
          width: 800,
          height: 600,
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
      images: [''], // TODO: Create a default image
    },
  };
};

export default function Page() {
  return <Home />;
}
