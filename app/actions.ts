"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";

type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function testDatabaseConnection() {
  let isConnected = false;
  try {
    const mongoClient = await clientPromise;
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return !isConnected;
  } catch (e) {
    console.error(e);
    return isConnected;
  }
}

export async function getPosts(
  page: number,
  limit: number
): Promise<{
  posts: Post[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}> {
  const userId = headers().get("X-User-ID");
  const mongoClient = await clientPromise;
  const author = await mongoClient
    .db()
    .collection("users")
    .findOne({ _id: new ObjectId(userId!) });
  const skip = (page - 1) * limit;
  const posts = await mongoClient
    .db()
    .collection("posts")
    .find({ author: author?.email })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalPosts = await mongoClient
    .db()
    .collection("posts")
    .countDocuments({ author: author?.email });
  const totalPages = Math.ceil(totalPosts / limit);

  return {
    posts: posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    })) as Post[],
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export async function getPostById(id: string) {
  const userId = headers().get("X-User-ID");
  const mongoClient = await clientPromise;
  const author = await mongoClient
    .db()
    .collection("users")
    .findOne({ _id: new ObjectId(userId!) });
  if (!author) {
    throw new Error("User not found");
  }
  const post = await mongoClient
    .db()
    .collection("posts")
    .findOne({ _id: new ObjectId(id), author: author.email });

  if (!post) return null;

  return { ...post, _id: post._id.toString() } as Post;
}

export async function createPost(post: { title: string; content: string }) {
  const userId = headers().get("X-User-ID");
  const mongoClient = await clientPromise;
  const author = await mongoClient
    .db()
    .collection("users")
    .findOne({ _id: new ObjectId(userId!) });
  if (!author) {
    throw new Error("User not found");
  }
  const result = await mongoClient
    .db()
    .collection("posts")
    .insertOne({
      ...post,
      author: author?.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  return result.insertedId.toString();
}

export async function updatePost(
  id: string,
  post: {
    title: string;
    content: string;
  }
) {
  const mongoClient = await clientPromise;
  const result = await mongoClient
    .db()
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...post, updatedAt: new Date() } }
    );
  return result.modifiedCount;
}

export async function deletePost(id: string) {
  const mongoClient = await clientPromise;
  const result = await mongoClient
    .db()
    .collection("posts")
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return null;
  }
  const mongoClient = await clientPromise;
  const user = await mongoClient.db().collection("users").findOne({ email });
  if (!user) {
    return null;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1 week",
  });
  cookies().set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
  return user;
}

export async function logout() {
  cookies().delete("session");
}
