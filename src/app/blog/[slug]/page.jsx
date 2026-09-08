// src/app/blog/[slug]/page.jsx
import { getAllPostSlugs, getPostData } from "@/src/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiClock, FiTag, FiArrowLeft } from "react-icons/fi";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
   
  if (!params?.slug) {
    return { title: "Post Not Found" };
  }

  try {
    const post = getPostData(params.slug);
    return {
      title: `${post.title} - Hero Kidz Blog`,
      description: post.description || post.title,
    };
  } catch (error) {
    return { title: "Post Not Found" };
  }
}

export default function BlogPost({ params }) {
  
  if (!params?.slug) {
    notFound();
  }

  let post;
  try {
    post = getPostData(params.slug);
  } catch (error) {
    console.error("Error loading post:", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 text-sm font-medium text-pink-500 transition-all hover:gap-3"
      >
        <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      {post.coverImage && (
        <div className="relative mt-6 aspect-[21/9] overflow-hidden rounded-2xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <FiCalendar size={14} />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <FiClock size={14} />
              {post.readingTime} min read
            </span>
          )}
          {post.category && (
            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
              {post.category}
            </span>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-extrabold text-slate-800 sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-3 text-lg text-slate-500">{post.description}</p>
        )}

        <div className="mt-4 flex items-center gap-3 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500">
              {post.author?.charAt(0) || "H"}
            </div>
            <div>
              <p className="font-semibold text-slate-800">
                {post.author || "Hero Kidz Team"}
              </p>
              <p className="text-xs text-slate-400">Author</p>
            </div>
          </div>
        </div>
      </header>

      <div
        className="prose prose-lg prose-pink mt-8 max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-pink-500 prose-strong:text-slate-800 prose-li:text-slate-600"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
          <FiTag className="text-slate-400" size={16} />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
