import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {PostData} from './types';
import markdownToHtml from '../utulities/markdownToHtml';
import {performance} from 'perf_hooks';

const postsDir = 'posts';
const postsDirectory = path.join(process.cwd(), postsDir);
const postsFilePath = path.join(process.cwd(), 'public', 'posts.json');

export async function getPaginatedPostsData(
  page: number,
  postsPerPage: number,
  searchTerm: string = ''
) {
  const start = performance.now();

  const allPosts = JSON.parse(
    await fs.promises.readFile(postsFilePath, 'utf8')
  ) as PostData[];

  const isLocal = process.env.NODE_ENV === 'development';

  const sortedPosts = allPosts
    .filter((post) => (isLocal ? true : post.published))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .filter((post) =>
      [post.title, post.summary, post.content]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const end = performance.now();
  console.log(`- - - - > getPaginatedPostsData in ${end - start}ms`);

  return {
    posts: paginatedPosts,
    totalPages: Math.ceil(sortedPosts.length / postsPerPage),
  };
}

export const getPostData = async (slug: string): Promise<PostData> => {
  const start = performance.now();
  const fileNames = fs.readdirSync(postsDirectory);
  const matchedFile = fileNames.find((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const {data} = matter(fileContents);

    // Normalize slug comparisons
    const oldSlug =
      data.slug && data.slug.includes('/?p=')
        ? data.slug.replace('/?p=', '')
        : data.slug;
    const newSlug = data.slug;

    // Match against multiple possible slug formats
    return (
      slug === oldSlug ||
      slug === newSlug ||
      slug === data.slug ||
      slug === data.id
    );
  });

  if (!matchedFile) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const fullPath = path.join(postsDirectory, matchedFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);
  const htmlContent = await markdownToHtml(content || '');

  const end = performance.now();
  console.log(`getSinglePost in ${end - start}ms`);

  return {
    slug,
    title: data.title,
    date: data.date,
    content: htmlContent,
    categories: data.categories || [],
    language: data.language || '',
    published: data.published || false,
    summary: data.summary || '',
    id: data.id || '',
    ...data,
  };
};
