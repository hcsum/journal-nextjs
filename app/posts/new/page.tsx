"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/actions";

const NewPostPage: React.FC = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const postId = await createPost(values);
          router.push(`/posts/${postId}`);
        } catch (error) {
          console.error("Failed to create post:", error);
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
              Create Post
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostPage;
