import React from 'react'

export default function Header() {
  return (
    // z-[999] is a index for the header to be on top of everything
    // relative is a position for the header to be relative to the parent element
    <header className='z-[999] relative'>
        <div className='flex justify-between items-center p-4 bg-slate-500'></div>
    </header>
  )
}
