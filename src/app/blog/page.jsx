import { getAllPosts } from "@/src/lib/blog";
import BlogList from "@/src/Components/Blog/BlogList";

export const metadata = {
  title: "Blog",
  description:
    "Read the latest articles about kids, toys, education, and parenting.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 sm:text-5xl">
          Our Blog
          <span className="block text-pink-500">Learn, Play & Grow</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
          Expert tips, educational insights, and fun activities for your little
          ones.
        </p>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
