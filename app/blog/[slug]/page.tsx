import { BlogPost } from "../types/BlogPost";
import BlogPostPage from "../_components/BlogPostPage";
import { blogs } from "../../(data)/Blogs"; // Import your blog data array

export default function Page({ params }: { params: { slug: string } }) {
  // Find the post based on the slug
  const post: BlogPost | undefined = blogs.find((p) => p.slug === params.slug);

  if (!post) {
    return <p>Post not found</p>;
  }

  return <BlogPostPage post={post} />;
}
