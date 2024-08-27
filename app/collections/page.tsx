import React from 'react'
import Image from 'next/image'

export default function CollectionsPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Collections</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* <Image
                        className="w-full h-48 object-cover"
                        src="https://images.unsplash.com/photo-1612833469399-3e2f4e1c3b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjQwNzB8MHwxfGFsbHwxf"
                        alt="Collection 1"
                        width={600}
                        height={300}
                    /> */}
                    <div className="p-4">
                        <h2 className="m-0 text-xl">Collection 1</h2>
                        <p className="mt-2 text-gray-600">Description 1</p>
                    </div>
                    <div className="flex justify-between items-center p-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
