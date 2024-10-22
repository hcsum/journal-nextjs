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
      <h1>Posts</h1>
      <Link href="/posts/new">Add new</Link>
      {posts.map((post) => (
        <Card key={post._id} sx={{ marginBottom: "1rem" }} variant="outlined">
          <CardContent>
            <h2 className="font-bold mb-2">
              <Link href={`/posts/${post._id}`}>{post.title}</Link>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <p className="text-sm text-gray-500">
              {post.createdAt?.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
      <Pagination totalPages={totalPages} currentPage={page} />
    </div>
  );
};

export default PostsPage;
