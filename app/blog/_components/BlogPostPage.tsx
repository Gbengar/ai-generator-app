import Link from "next/link";
import { BlogPost } from "../types/BlogPost";

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-20">
      <Link href="/blog">
        <span className="text-pink-500 hover:underline">
          ← Back to the blog
        </span>
      </Link>
      <article className="mt-8 p-10">
        <p className="text-gray-400 mb-2">{post.date}</p>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-gray-800 text-pink-500"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
        <div
          className="prose prose-invert leading-10	"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
