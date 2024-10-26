import { Card, CardContent, Link } from "@mui/material";
import { getPosts } from "../actions";
import Pagination from "./Pagination";
import { redirect } from "next/navigation";

const TAKE = 10;

const PostsPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  if (!searchParams.page) {
    redirect("/posts?page=1");
  }
  const page = Number(searchParams.page);
  const { posts, totalPages } = await getPosts(page, TAKE);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Posts</h1>
      <Link href="/posts/new" sx={{ mb: 2, display: "inline-block" }}>
        Add new
      </Link>
      {posts.map((post) => (
        <div
          key={post._id}
          className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4"
        >
          <Link href={`/posts/${post._id}`}>
            <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h3>
          </Link>
          <div
            className="font-normal text-gray-700 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <p className="text-sm text-gray-500 mt-2">
            {post.createdAt?.toLocaleString()}
          </p>
        </div>
      ))}
      <Pagination totalPages={totalPages} currentPage={page} />
    </div>
  );
};

export default PostsPage;
