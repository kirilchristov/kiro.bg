import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {PostData} from './types';
import markdownToHtml from '../utulities/markdownToHtml';

const postsDir = 'posts';
const postsDirectory = path.join(process.cwd(), postsDir);

export async function getPaginatedPostsData(
  page: number,
  postsPerPage: number,
  searchTerm: string = ''
) {
  const fileNames = await fs.promises.readdir(postsDirectory);

  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.promises.readFile(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title,
        summary: matterResult.data.summary,
        content: matterResult.content,
        date: matterResult.data.date,
        slug: matterResult.data.slug,
        postImage: matterResult.data.postImage || '',
        published: matterResult.data.published,
      };
    })
  );

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

  return {
    posts: paginatedPosts,
    totalPages: Math.ceil(sortedPosts.length / postsPerPage),
  };
}

export const getPostData = async (slug: string): Promise<PostData> => {
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
