import BlogTable from "@/components/blog-table";
import { getBlogPosts } from "@/lib/get-blog-posts";

export default async function BlogListPage() {
  const posts = await getBlogPosts(); // Fetch data on the server

  return <BlogTable posts={posts} />; // Pass posts to Client Component
}
