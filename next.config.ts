import type { NextConfig } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const nextConfig: NextConfig = {
  async redirects() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const queryValue = data.slug.replace('/?p=', '');

      return {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'p',
            value: queryValue,
          },
        ],
        destination: `/posts/${fileName.replace('.md', '')}`,
        permanent: true,
      };
    });
  },
};

export default nextConfig;
