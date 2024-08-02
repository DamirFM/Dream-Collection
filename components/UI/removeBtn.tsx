import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

export default function RemoveBtn() {
  return (
    <button>
        <HiOutlineTrash className="text-2xl text-red-600 cursor-pointer" />
    </button>
  )
}
