"use client";

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../actions';
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const user = await login(formData);
    if (user) {
      router.push('/');
    }
  }
 
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}