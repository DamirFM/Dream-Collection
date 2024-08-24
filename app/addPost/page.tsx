"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoginPage from '../login/page';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();
  const { status } = useSession();
  if (status === 'unauthenticated') {
    return <LoginPage />;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); // Store the selected image
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !file) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file); // Append the image to the form data

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        router.push('/'); // Redirect to home page
      } else {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3 px-8 py-2 items-center justify-center h-screen bg-stone-100">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        className="border border-stone-900 p-2 rounded-lg"
        placeholder="Title"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="border border-stone-900 p-2 rounded-lg"
        placeholder="Description"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border border-stone-900 p-2 rounded-lg"
      />
      <button type="submit" className="bg-stone-900 text-white p-2 rounded-lg">
        Submit
      </button>
    </form>
  );
}
