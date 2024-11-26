export type PostData = {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  categories: string[];
  language: 'BG' | 'EN';
  published: boolean;
  summary: string;
};

export type Post = {
  data: PostData;
  content: string;
};
