import { login } from "../actions";
import { revalidatePath } from "next/cache";

export default function LoginPage() {
  async function handleSubmit(formData: FormData) {
    "use server";

    await login(formData);
    revalidatePath("/posts");
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-2 ">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button
        formAction={handleSubmit}
        type="submit"
        className="dark:text-white"
      >
        Login
      </button>
    </form>
  );
}
