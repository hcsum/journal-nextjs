import { testDatabaseConnection, getPosts } from "./actions";
import Link from "next/link";

export default async function Home() {
  const isConnected = await testDatabaseConnection();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isConnected ? <p>Connected to MongoDB</p> : <p>Not connected to MongoDB</p>}
      <Link href="/posts">Posts</Link>
    </main>
  );
}
