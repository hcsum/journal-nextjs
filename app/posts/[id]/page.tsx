import { getPostById } from "@/app/actions";
import { notFound } from "next/navigation";
import EditPostForm from "./EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  return <EditPostForm post={post} />;
}
