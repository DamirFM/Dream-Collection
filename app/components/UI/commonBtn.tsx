import React from 'react'

export default function commonBtn() {
    return (
        <button
            onClick={() => (window.location.href = "/login")}
            className="text-stone-900 border border-stone-500  py-1 px-4 rounded-xl font-semibold text-xl hover:text-stone-50 hover:bg-stone-800 transition duration-300 ease-in-out transform hover:scale-1"
        >
            Login
        </button>
    )
}
