// app/login/page.tsx
import React from 'react';

export default function LoginPage() {
  return (
    <div className="flex  items-center justify-center h-screen bg-stone-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form>
          <label className="block mb-4">
            <span className="text-stone-700">Email</span>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              placeholder="you@example.com"
            />
          </label>
          <label className="block mb-4">
            <span className="text-stone-700">Password</span>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              placeholder="********"
            />
          </label>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
