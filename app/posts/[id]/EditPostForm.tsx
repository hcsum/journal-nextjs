"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box } from "@mui/material";
import { deletePost, updatePost } from "@/app/actions";
import { useRouter } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const EditPostForm: React.FC<{ post: Post }> = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(post._id);
      router.push("/posts");
    }
  };

  if (!isEditing) {
    return (
      <>
        <h1 className="text-xl font-bold dark:text-white">{post.title}</h1>
        <p className="text-gray-500 mt-2 dark:text-white">{post.content}</p>
        <p className="text-sm text-gray-500 mt-4">
          Created: {post.createdAt.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Last updated: {post.updatedAt.toLocaleString()}
        </p>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => setIsEditing(true)}
        >
          Edit Post
        </Button>
      </>
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          title: post.title,
          content: post.content,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updatePost(post._id, values);
            router.push("/posts");
          } catch (error) {
            console.error("Failed to update post:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Field
                as={TextField}
                name="title"
                label="Title"
                fullWidth
                variant="outlined"
              />
              <Field
                as={TextField}
                name="content"
                label="Content"
                multiline
                rows={12}
                fullWidth
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !dirty || !isValid}
              >
                Update Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Button
        type="button"
        variant="contained"
        sx={{ display: "block", mt: 2 }}
        color="warning"
        onClick={() => {
          if (confirm("Are you sure you want to cancel?")) {
            setIsEditing(false);
          }
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        sx={{ mt: 8 }}
      >
        Delete
      </Button>
    </>
  );
};

export default EditPostForm;
