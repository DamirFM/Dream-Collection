"use client";
import React from 'react'
import { useState } from 'react';

export default function addPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }

  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col w-full gap-3 px-8 py-2 items-center justify-center h-screen bg-stone-100'
    >
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type='text' 
        className='border border-stone-900 p-2 rounded-lg'
        placeholder='Title'
        ></input>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type='text' 
        className='border border-stone-900 p-2 rounded-lg'
        placeholder='Description'
        ></input>
        <button type='submit' className='bg-stone-900 text-white p-2 rounded-lg'>Submit</button>

    </form>
  )
}
