// src/Components/Blog/BlogCard.jsx
import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";

const BlogCard = ({ post }) => {
  const title = post.title || "Untitled Post";
  const description = post.description || "Read more about this topic...";
  const date = post.date ? new Date(post.date) : new Date();

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 text-6xl">
              📚
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <FiCalendar size={12} />
              {date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <FiClock size={12} />
                {post.readingTime} min read
              </span>
            )}
            {post.category && (
              <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-600">
                {post.category}
              </span>
            )}
          </div>

          <h2 className="mt-2 line-clamp-2 text-xl font-bold text-slate-800 transition-colors group-hover:text-pink-500">
            {title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
            {description}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-pink-500 transition-all duration-300 group-hover:gap-3">
              <span className="relative">
                Continue Reading
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-pink-500 transition-all duration-300 group-hover:w-full" />
              </span>
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>

            <span className="text-xs text-slate-400">
              📖 {post.readingTime || 3} min
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
