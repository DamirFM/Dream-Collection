"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoginPage from '../login/page';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return <LoginPage />;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!title || !description || !file) {
      setLoading(false);
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('tags', JSON.stringify(tags)); // Convert tags array to JSON string

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setSuccessMessage('Post created successfully!');
        router.push('/feed');
      } else {
        throw new Error(res.statusText);
      }
    } catch (error) {
      setErrorMessage('Failed to create post. Please try again.');
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileButtonClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div className="relative flex justify-center w-full h-screen">
      {/* Background Blobs */}
      <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
      <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[28rem] xl:left-[15rem] 2xl:left-[-5rem]"></div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg gap-5 p-8 items-center justify-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Create New Post</h2>

        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Title"
        />

        {/* <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Description"
          rows={3}
        /> */}

        <div className="w-full flex flex-col gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Add tags (press Enter to add)"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center bg-gray-200 px-2 py-1 rounded-full">
                <span className="text-sm">{tag}</span>
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => removeTag(tag)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Custom Button to Upload File */}
        <button
          type="button"
          onClick={handleFileButtonClick}
          className="w-full bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-800 transition"
        >
          {file ? file.name : "Choose File"}
        </button>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {/* Error or Success Messages */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </form>
    </div>
  );
}
