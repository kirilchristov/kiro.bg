import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {PostData} from './types';

const postsDir = 'posts';

const postsDirectory = path.join(process.cwd(), postsDir);

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents); // Parse frontmatter

      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        slug: matterResult.data.slug,
        categories: matterResult.data.categories,
        language: matterResult.data.language,
        published: matterResult.data.published,
        summary: matterResult.data.summary,
        content: matterResult.content,
        postImage: matterResult.data.postImage
          ? matterResult.data.postImage
          : '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string) {
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

  return {
    slug,
    title: data.title,
    date: data.date,
    contentHtml: content,
    ...data,
  };
}
