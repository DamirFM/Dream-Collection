import React from 'react'

export default function addPost() {
  return (
    <form
      className='flex flex-col w-full gap-3 px-8 py-2 items-center justify-center h-screen bg-stone-100'
    >
      <input
        type='text' 
        className='border border-stone-900 p-2 rounded-lg'
        placeholder='Title'
        ></input>
      <input
        type='text' 
        className='border border-stone-900 p-2 rounded-lg'
        placeholder='Description'
        ></input>
        <button className='bg-stone-900 text-white p-2 rounded-lg'>Submit</button>

    </form>
  )
}
