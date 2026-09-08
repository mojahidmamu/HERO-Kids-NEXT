// src/lib/blog.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/blog");
 
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}
 
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  const slugs = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
     const slug = data.slug || fileName.replace(/\.md$/, "");
    return { slug };
  });
  return slugs;
}

//  
export function getPostData(slug) { 
  const fileNames = fs.readdirSync(postsDirectory);
  let foundFile = null;
  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const fileSlug = data.slug || fileName.replace(/\.md$/, "");
    if (fileSlug === slug) {
      foundFile = fullPath;
      break;
    }
  }

  if (!foundFile) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const fileContents = fs.readFileSync(foundFile, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = remark().use(html).processSync(content);
  const contentHtml = processedContent.toString();

  return {
    slug: data.slug || slug,
    ...data,
    contentHtml,
  };
}
 
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const slug = data.slug || fileName.replace(/\.md$/, "");
    return {
      slug,
      ...data,
    };
  });
 
  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
