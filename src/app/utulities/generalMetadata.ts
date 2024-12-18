export const generalMetadata = () => {
  const imageUrl = 'https://www.kiro.bg/meta_image.png';
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
          url: imageUrl,
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
      images: [imageUrl],
    },
  };
};
