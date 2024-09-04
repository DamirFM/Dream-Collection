"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoginPage from '../login/page';

// Suggested Categories
const suggestedCategories = [
  'Travel', 'Nature', 'Landscape', 'Architect', 'Animals', 'People', 'Texture', 'Business', 'Other'
];

export default function AddPost() {
  const [title, setTitle] = useState('');
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

  const addTag = (newTag: string) => {
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
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

    if (!title || !file) {
      setLoading(false);
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
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
    <div className="relative flex flex-col lg:flex-row items-center justify-center w-full h-screen">
      {/* Background Blobs */}
      <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
      <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[28rem] xl:left-[15rem] 2xl:left-[-5rem]"></div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg gap-5 p-8 items-center justify-center lg:w-1/2"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Create New Post</h2>

        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Title"
        />

        {/* Suggested Categories */}
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800">Suggested Categories:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`px-3 py-1 rounded-full border ${tags.includes(category) ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
                  } hover:bg-gray-300 transition`}
                onClick={() => addTag(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Input and Display */}
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

        {/* Submit Button */}
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

      {/* Preview Section */}
      {file && (
        <div className="mt-8 lg:mt-0 lg:ml-8 p-4 border border-gray-300 rounded-lg max-w-lg w-full lg:w-1/2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Post Preview</h3>
          {/* Image Preview */}
          <div className="w-full h-64 bg-gray-100 rounded-lg flex justify-center items-center overflow-hidden mb-4">
            <img src={URL.createObjectURL(file)} alt="Preview" className="object-contain h-full" />
          </div>
          {/* Title Preview */}
          <h4 className="text-xl font-bold text-gray-800">{title || 'Your Title Here'}</h4>
          {/* Tags Preview */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 rounded-full bg-gray-200 text-gray-800">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
