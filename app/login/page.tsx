"use client";

import React, { useState } from 'react';
import SignInBtn from "../components/UI/SignInBtn";
import { useRouter } from "next/navigation";

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn, getSession } from 'next-auth/react';
// Define schema for validation
const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required")
}).required();

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const router = useRouter();
  const [error, setError] = useState("");



  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!res || res.error) {
      setError("Invalid credentials or an error occurred");
      return;
    }

    // Force refresh the session to ensure it updates
    await getSession(); // Fetch the session again
    router.replace("/profile");
  };




  return (
    <div className="relative flex items-center justify-center h-screen ">
      <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] "></div>
      <div className="bg-[#D7C3F1] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[28rem] xl:left-[15rem] 2xl:left-[-5rem] "></div>

      <div className="relative w-full max-w-xl p-8 ">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <div className="flex justify-center mb-6">
          <SignInBtn />
        </div>
        <p className="text-center text-stone-700 my-4">OR</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-4">
            <span className="text-stone-700 font-bold">Email</span>
            <input
              {...register('email')}
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50 hover:border-stone-500 transition duration-300 ease-in-out"
              placeholder="you@example.com"
            />
            {errors.email && <div className="text-red-500">{errors.email.message}</div>}
          </label>
          <label className="block mb-4">
            <div className="flex justify-between">
              <span className="text-stone-700 font-bold">Password</span>
              <span className="block text-right text-stone-500 text-sm">
                <a href="#" className="hover:underline">Forgot password?</a>
              </span>
            </div>
            <input
              {...register('password')}
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50 hover:border-stone-500 transition duration-300 ease-in-out"
              placeholder="********"
            />
            {errors.password && <div className="text-red-500">{errors.password.message}</div>}
          </label>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-stone-900 text-white shadow-md rounded-md hover:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-opacity-50"
          >
            Login
          </button>
          {error && <div className="text-red-500 rounded-md">{error}</div>}
        </form>
        <p className="text-center mt-4 text-stone-700">
          Don&apos;t have an account? <a href="/join" className="hover:underline text-stone-900">JOIN</a>
        </p>
      </div>
    </div>
  );
}
