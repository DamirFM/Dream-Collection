// EditPostForm.tsx
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

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

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
      console.log("Error updating post:", error);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="flex flex-col w-full gap-3 px-8 py-2 items-center justify-center h-screen bg-stone-100"
    >
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        type="text"
        className="border border-stone-900 p-2 rounded-lg"
        placeholder="Title"
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        type="text"
        className="border border-stone-900 p-2 rounded-lg"
        placeholder="Description"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="border border-stone-900 p-2 rounded-lg"
      />
      <button className="bg-stone-900 text-white p-2 rounded-lg">Update</button>
    </form>
  );
}
