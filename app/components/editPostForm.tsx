"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditPostFormProps {
  id: string;
  title: string;
  description: string;
}
// http://localhost:3000/api/posts/${id}
// Update the function signature to use the props interface
export default function EditPostForm({ id, title, description }: EditPostFormProps) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
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
      <button className="bg-stone-900 text-white p-2 rounded-lg">Update</button>
    </form>
  );
}
