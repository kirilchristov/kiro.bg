// This script uploads images from public/images/ to Cloudinary and replaces local links in markdown files with Cloudinary URLs.
// Usage: node scripts/upload-images-to-cloudinary.js
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import {globSync} from 'glob';
import {fileURLToPath} from 'url';
import 'dotenv/config';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagesDir = path.join(__dirname, '../public/images');
const postsDir = path.join(__dirname, '../posts');

async function uploadImage(filePath) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'blog-images',
    use_filename: true,
    unique_filename: false,
    overwrite: false,
  });
  return result.secure_url;
}

async function main() {
  // Find all images in public/images
  const imageFiles = globSync(`${imagesDir}/**/*.{jpg,jpeg,png,gif,webp}`, {
    nocase: true,
  });

  const urlMap = {};

  for (const img of imageFiles) {
    const imgName = path.basename(img);
    const url = await uploadImage(img);
    urlMap[imgName] = url;
    console.log(`Uploaded ${imgName} -> ${url}`);
    // Delete the local image after successful upload
    try {
      fs.unlinkSync(img);
      console.log(`Deleted local image: ${img}`);
    } catch (err) {
      console.error(`Failed to delete local image: ${img}`, err);
    }
  }

  // Find all markdown files
  const mdFiles = globSync(`${postsDir}/**/*.md`);

  for (const mdFile of mdFiles) {
    let rawContent = fs.readFileSync(mdFile, 'utf8');
    let changed = false;
    let parsed = matter(rawContent);
    let content = parsed.content;
    let data = parsed.data;

    // Replace image links in markdown body
    for (const [imgName, url] of Object.entries(urlMap)) {
      const regex = new RegExp(
        `(!\\[[^\\]]*\\]\\()([^)]*${imgName})(\\))`,
        'g'
      );
      if (regex.test(content)) {
        content = content.replace(regex, `$1${url}$3`);
        changed = true;
      }
      // Replace postImage in frontmatter if it matches
      if (
        data.postImage &&
        typeof data.postImage === 'string' &&
        data.postImage.includes(imgName)
      ) {
        data.postImage = url;
        changed = true;
        console.log(`Updated postImage in frontmatter for ${mdFile}`);
      }
    }

    if (changed) {
      const newRaw = matter.stringify(content, data);
      fs.writeFileSync(mdFile, newRaw, 'utf8');
      console.log(`Updated image links in ${mdFile}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
