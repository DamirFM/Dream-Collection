"use client";
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

export default function RemoveBtn({id}: {id: string}) {

  const handleRemove = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?');

    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!res.ok) {
          throw new Error('Failed to delete post');
        }
  
        // Refresh the page
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete post:', error)
    }
    }

}

  return (
    <button onClick={handleRemove}>
        <HiOutlineTrash className="text-2xl text-red-600 cursor-pointer" />
    </button>
  )
}
