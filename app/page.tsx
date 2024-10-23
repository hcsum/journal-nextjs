import { testDatabaseConnection } from "./actions";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
export default async function Home() {
  const isConnected = await testDatabaseConnection();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:text-white">
      {isConnected ? (
        <p>Connected to MongoDB</p>
      ) : (
        <p>Not connected to MongoDB</p>
      )}
      <Link href="/posts?page=1">Posts</Link>
      <LogoutButton />
    </main>
  );
}
