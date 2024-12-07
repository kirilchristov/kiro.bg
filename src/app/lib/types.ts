import { ReactNode } from "react";

export type PostData = {
  categories: string[];
  date: string;
  language: 'BG' | 'EN';
  slug: string;
  title: string;
  published: boolean;
  summary: string;
  id: string;
  content: string;
  postImage?: string;
};
