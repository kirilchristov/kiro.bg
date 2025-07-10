// This script uploads images from public/images/ to Cloudinary and replaces local links in markdown files with Cloudinary URLs.
// Usage: node scripts/upload-images-to-cloudinary.js
import fs from 'fs';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import glob from 'glob';
import {fileURLToPath} from 'url';
import 'dotenv/config';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary from environment variables
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
  const imageFiles = glob.sync(`${imagesDir}/**/*.{jpg,jpeg,png,gif,webp}`, {
    nocase: true,
  });

  const urlMap = {};

  for (const img of imageFiles) {
    const imgName = path.basename(img);
    const url = await uploadImage(img);
    urlMap[imgName] = url;
    console.log(`Uploaded ${imgName} -> ${url}`);
  }

  // Find all markdown files
  const mdFiles = glob.sync(`${postsDir}/**/*.md`);

  for (const mdFile of mdFiles) {
    let content = fs.readFileSync(mdFile, 'utf8');
    let changed = false;

    for (const [imgName, url] of Object.entries(urlMap)) {
      // Replace ![alt](public/images/...) or ![alt](../public/images/...) with Cloudinary URL
      const regex = new RegExp(
        `(!\\[[^\\]]*\\]\\()([^)]*${imgName})(\\))`,
        'g'
      );
      if (regex.test(content)) {
        content = content.replace(regex, `$1${url}$3`);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(mdFile, content, 'utf8');
      console.log(`Updated image links in ${mdFile}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
