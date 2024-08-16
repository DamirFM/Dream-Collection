"use client";

import React from 'react';
import SignInBtn from "../components/UI/SignInBtn"
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';
// import { authOptions } from '@/lib/auth';

export default function LoginPage() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res) {
        setError("Something went wrong. Please try again.");
        return;
      }

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.push('/profile');
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // const session = await getServerSession(authOptions);
  // if (session) {
  //   redirect("/");
  // }

  return (
    <div className="flex items-center justify-center h-screen bg-stone-50">
      <div className="w-full max-w-xl p-8 bg-stone-50 ">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <div className="flex justify-center mb-6">
          <SignInBtn />
        </div>
        <p className="text-center text-stone-700 my-4">OR</p>
        <form
          onSubmit={handleSubmit}
        >
          <label className="block mb-4">
            <span className="text-stone-700 font-bold">Email</span>
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50  hover:border-stone-500 transition duration-300 ease-in-out transform hover:scale-1"
              placeholder="you@example.com"
            />
          </label>
          <label className="block mb-4">
            <div className="flex justify-between">
              <span className="text-stone-700 font-bold">Password</span>
              <span className="block text-right text-stone-500 text-sm">
                <a href="#" className="hover:underline">
                  Forgot password?
                </a>
              </span>
            </div>
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50  hover:border-stone-500 transition duration-300 ease-in-out transform hover:scale-1"
              placeholder="********"
            />
          </label>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-stone-900 text-white shadow-md rounded-md hover:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-opacity-50"
          >
            Login
          </button>
          {error && (
            <div className=" text-red-500  rounded-md">
              {error}
            </div>
          )}
        </form>
        <p className="text-center mt-4 text-stone-700">
          Don&apos;t have an account?{" "}
          <a href="/join" className="hover:underline text-stone-900">
            JOIN
          </a>
        </p>
      </div>
    </div>
  );
}
