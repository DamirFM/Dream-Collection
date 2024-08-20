// "use client";
// import React from 'react';
// import { useRouter } from "next/navigation";
// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';
// import { authOptions } from '@/lib/auth';
// // http://localhost:3000/api/userExists
// export default async function JoinPage() {
//     const [name, setName] = React.useState("");
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");
//     const [error, setError] = React.useState("");
//     const router = useRouter();

//     const handleJoin = async (e: any) => {
//         e.preventDefault();
//         if (!name || !email || !password) {
//             setError("Please fill all fields");
//             return;
//         }

//         try {

//             // check if user exists
//             const resUserExists = await fetch("/api/userExists", {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json",
//                 },
//                 body: JSON.stringify({ email }),
//             });
//             const { user } = await resUserExists.json();
//             if (user) {
//                 setError("User already exists");
//                 return;
//             }

//             const res = await fetch("/api/user", {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json",
//                 },
//                 body: JSON.stringify({ name, email, password }),
//             });
//             if (res.ok) {
//                 router.push('/profile');
//             }
//         } catch (error) {
//             console.log(error);
//             setError("Failed to create user");
//         }
//     }

//     const session = await getServerSession(authOptions);
//     if (session) {
//         redirect("/");
//     }
//     return (
//         <div className="flex items-center justify-center h-screen bg-stone-50">
//             <div className="w-full max-w-xl p-8 bg-stone-50 ">
//                 <h2 className="text-center text-2xl font-bold mb-6">Join</h2>
//                 <form
//                     onSubmit={handleJoin}
//                 >
//                     <label className="block mb-4">
//                         <span className="text-stone-700 font-bold">Name</span>
//                         <input
//                             onChange={e => setName(e.target.value)}
//                             value={name}
//                             type="text"
//                             className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50  hover:border-stone-500 transition duration-300 ease-in-out transform hover:scale-1"
//                             placeholder="John Doe"
//                         />
//                     </label>
//                     <label className="block mb-4">
//                         <span className="text-stone-700 font-bold">Email</span>
//                         <input
//                             onChange={e => setEmail(e.target.value)}
//                             value={email}
//                             type="email"
//                             className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50  hover:border-stone-500 transition duration-300 ease-in-out transform hover:scale-1"
//                             placeholder="you@example.com"
//                         />
//                     </label>
//                     <label className="block mb-4">
//                         <div className="flex justify-between">
//                             <span className="text-stone-700 font-bold">Password</span>
//                         </div>
//                         <input
//                             onChange={e => setPassword(e.target.value)}
//                             value={password}
//                             type="password"
//                             className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50  hover:border-stone-500 transition duration-300 ease-in-out transform hover:scale-1"
//                             placeholder="********"
//                         />
//                     </label>
//                     <button
//                         type="submit"
//                         className="w-full px-4 py-2 bg-stone-900 text-white shadow-md rounded-md hover:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-opacity-50"
//                     >
//                         Join
//                     </button>
//                     {error && (
//                         <div className=" text-red-500  rounded-md">
//                             {error}
//                         </div>
//                     )}
//                 </form>
//                 <p className="text-center mt-4 text-stone-700">
//                     Already have an account?{" "}
//                     <a href="/login" className="hover:underline text-stone-900">
//                         LOGIN
//                     </a>
//                 </p>
//             </div>
//         </div>
//     )
// }

"use client";

import React from 'react';
import { useRouter } from "next/navigation";
// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';
// import { authOptions } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Define schema for validation
const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required")
}).required();

export default function JoinPage() {
    const router = useRouter();
    const [error, setError] = React.useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: { email: any; }) => {
        try {
            // Check if user exists
            const resUserExists = await fetch("/api/userExists", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email: data.email }),
            });
            const { user } = await resUserExists.json();
            if (user) {
                setError("User already exists");
                return;
            }

            // Create user
            const res = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                router.push('/profile');
            } else {
                setError("Failed to create user");
            }
        } catch (error) {
            console.error(error);
            setError("Failed to create user");
        }
    };

    //   // Server-side session check
    //   const session = getServerSession(authOptions);
    //   if (session) {
    //     redirect("/");
    //   }

    return (
        <div className="flex items-center justify-center h-screen bg-stone-50">
            <div className="w-full max-w-xl p-8 bg-stone-50">
                <h2 className="text-center text-2xl font-bold mb-6">Join</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block mb-4">
                        <span className="text-stone-700 font-bold">Name</span>
                        <input
                            {...register('name')}
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50 hover:border-stone-500 transition duration-300 ease-in-out"
                            placeholder="John Doe"
                        />
                        {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                    </label>
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
                        Join
                    </button>
                    {error && (
                        <div className=" text-red-500  rounded-md">
                            {error}
                        </div>
                    )}
                </form>
                <p className="text-center mt-4 text-stone-700">
                    Already have an account?{" "}
                    <a href="/login" className="hover:underline text-stone-900">
                        LOGIN
                    </a>
                </p>
            </div>
        </div>
    );
}
