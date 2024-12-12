import {PostData} from '../lib/types';

export const postMetadata = (postData: PostData) => {
  const {title, summary, slug, postImage} = postData;
  const defaultDescription = 'Read more about this post.';

  return {
    title: `Kiro.bg - ${title}`,
    description: summary || defaultDescription,
    openGraph: {
      title,
      description: summary || defaultDescription,
      url: `/posts/${slug}`,
      type: 'article',
      images: postImage
        ? [
            {
              url: postImage,
              width: 'auto',
              height: 'auto',
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary || defaultDescription,
      images: postImage ? [postImage] : [],
    },
  };
};
