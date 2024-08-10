
import React from 'react';
import SignInBtn from "../../components/UI/SignInBtn"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-stone-50">
      <div className="w-full max-w-xl p-8 bg-stone-50 ">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <div className="flex justify-center mb-6">
          <SignInBtn />
        </div>
        <p className="text-center text-stone-700 my-4">OR</p>
        <form>
          <label className="block mb-4">
            <span className="text-stone-700 font-bold">Email</span>
            <input
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
        </form>
        <p className="text-center mt-4 text-stone-700">
          Don't have an account?{" "}
          <a href="/join" className="hover:underline text-stone-900">
            JOIN
          </a>
        </p>
      </div>
    </div>
  );
}
