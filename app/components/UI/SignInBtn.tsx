"use client";

import Image from "next/image";
// signIn is a function that is used to sign in a user. It is provided by the next-auth/react package.
import { signIn } from "next-auth/react";

export default function SignInBtn() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center gap-4 shadow-md rounded-md pl-3 dark:bg-slate-900"
    >
      <Image src="/google-logo.png" alt='Google SignIn button' height={30} width={30} />
      <span className="bg-blue-500 text-white px-4 py-2 rounded-r-md dark:bg-slate-500">
        Continue with Google
      </span>
    </button>
  );
}