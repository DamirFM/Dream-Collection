"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditPostFormProps {
  id: string;
  title: string;
  description: string;
}

export default function EditPostForm({ id, title, description }: EditPostFormProps) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", newTitle);
    formData.append("description", newDescription);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to update post: ${res.statusText}`);
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-50">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-stone-800 text-center">Edit Post</h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-stone-700">Title</label>
          <input
            id="title"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            type="text"
            className="mt-1 w-full p-2 border border-stone-300 rounded-lg focus:ring focus:ring-stone-500 focus:border-stone-500"
            placeholder="Enter post title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-stone-700">Description</label>
          <textarea
            id="description"
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            rows={4}
            className="mt-1 w-full p-2 border border-stone-300 rounded-lg focus:ring focus:ring-stone-500 focus:border-stone-500"
            placeholder="Enter post description"
            required
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-stone-700">Upload Image</label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="mt-2 w-full p-2 border border-stone-300 rounded-lg focus:ring focus:ring-stone-500 focus:border-stone-500"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition-colors 
          ${loading ? 'bg-stone-400' : 'bg-stone-900 hover:bg-stone-700'}`}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}
