"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useSession } from "next-auth/react";
// Define schema for validation
const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required")
}).required();

export default function JoinPage() {
    const { status, data: session } = useSession();
    const router = useRouter();
    const [error, setError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: { email: string; name: string; password: string; }) => {
        console.log("Submitting join form with data:", data);
        try {
            // Check if the user already exists
            const resUserExists = await fetch("/api/userExists", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email: data.email }),
            });

            if (!resUserExists.ok) {
                throw new Error(`Error: ${resUserExists.statusText}`);
            }

            const { user } = await resUserExists.json();
            if (user) {
                setError("User already exists");
                return;
            }

            // Register new user
            const res = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                console.log("User created successfully.");

                // Automatically log in the user after successful registration
                const signInResponse = await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false, // Prevent default redirect
                });

                if (signInResponse?.error) {
                    setError("Failed to log in after registration. Please try to log in manually.");
                } else {
                    router.push('/profile'); // Redirect to profile page after successful login
                }
            } else {
                const errorData = await res.json();
                setError(`Failed to create user: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Submit Error:", error);
            setError("Failed to create user");
        }
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center h-screen">
            {/* Background Blobs */}
            <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-slate-900"></div>
            <div className="bg-[#D7C3F1] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[28rem] xl:left-[15rem] 2xl:left-[-5rem] dark:bg-slate-900"></div>

            {/* Join Form */}
            <div className="relative w-full max-w-xl p-8">
                <h2 className="text-center text-2xl font-bold mb-6 dark:text-stone-300">Join</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block mb-4">
                        <span className="text-stone-700 font-bold dark:text-stone-300">Name</span>
                        <input
                            {...register('name')}
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50 hover:border-stone-500 transition duration-300 ease-in-out dark:bg-slate-800 dark:border-slate-600"
                            placeholder="John Doe"
                        />
                        {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                    </label>
                    <label className="block mb-4">
                        <span className="text-stone-700 font-bold dark:text-stone-300">Email</span>
                        <input
                            {...register('email')}
                            type="email"
                            className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50 hover:border-stone-500 transition duration-300 ease-in-out dark:bg-slate-800 dark:border-slate-600"
                            placeholder="you@example.com"
                        />
                        {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                    </label>
                    <label className="block mb-4">
                        <div className="flex justify-between">
                            <span className="text-stone-700 font-bold dark:text-stone-300">Password</span>
                        </div>
                        <input
                            {...register('password')}
                            type="password"
                            className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50 hover:border-stone-500 transition duration-300 ease-in-out dark:bg-slate-800 dark:border-slate-600"
                            placeholder="********"
                        />
                        {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                    </label>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-stone-900 text-white shadow-md rounded-md hover:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-opacity-50 dark:bg-slate-500"
                    >
                        Join
                    </button>
                    {error && <div className="text-red-500 rounded-md mt-2">{error}</div>}
                </form>
                <p className="text-center mt-4 text-stone-700 dark:text-stone-300">
                    Already have an account?{" "}
                    <a href="/login" className="hover:underline text-stone-900 dark:text-stone-300">
                        LOGIN
                    </a>
                </p>
            </div>
        </div>
    );
}
