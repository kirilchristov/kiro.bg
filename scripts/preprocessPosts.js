import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = 'posts';
const postsDirectory = path.join(process.cwd(), postsDir);
const outputFile = path.join(process.cwd(), 'public', 'posts.json');

async function preprocessPosts() {
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
        date: matterResult.data.date,
        slug: matterResult.data.slug,
        postImage: matterResult.data.postImage || '',
        published: matterResult.data.published,
      };
    })
  );

  await fs.promises.writeFile(outputFile, JSON.stringify(allPosts, null, 2));
  console.log(`✅ Preprocessed ${allPosts.length} posts into ${outputFile}`);
}

preprocessPosts().catch((error) => {
  console.error('Error preprocessing posts:', error);
  process.exit(1);
});
