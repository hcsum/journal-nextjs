"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box } from "@mui/material";
import { updatePost } from "@/app/actions";
import { useRouter } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  content: string;
}

const EditPostForm: React.FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();

  return (
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
      {({ isSubmitting }) => (
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
              rows={4}
              fullWidth
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Update Post
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditPostForm;
