"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { HiDownload } from 'react-icons/hi';
import BlurFade from "@/components/magicui/blur-fade";

const images = Array.from({ length: 9 }, (_, i) => {
  const isLandscape = i % 2 === 0;
  const width = isLandscape ? 800 : 600;
  const height = isLandscape ? 600 : 800;
  return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});

type Post = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

type PostCardProps = {
  posts: Post[];
};

const PostCard: React.FC<PostCardProps> = ({ posts }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const [loadingImages, setLoadingImages] = useState<boolean[]>(posts.map(() => true));

  const handleImageLoad = (index: number) => {
    setLoadingImages(prevLoadingImages => {
      const newLoadingImages = [...prevLoadingImages];
      newLoadingImages[index] = false;
      return newLoadingImages;
    });
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {posts.map((post, idx) => (
        <div
          key={post._id}
          className="relative mb-4 break-inside-avoid   rounded-sm overflow-hidden group"
        >
          {post.imageUrl && (
            <BlurFade key={post.imageUrl} delay={0.25 + idx * 0.05} inView>
              <div className="relative w-full h-auto">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={800}
                  height={0}
                  loading="lazy"
                  onLoad={() => handleImageLoad(idx)}
                  className="object-cover object-center w-full h-auto transition-transform duration-300 ease-in-out transform scale-105"
                />
              </div>
            </BlurFade>
          )}
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-center text-white">
              <span className="text-sm">Username</span>
              <a
                href={post.imageUrl}
                download
                className="text-lg cursor-pointer hover:text-gray-300 transition-colors duration-300"
                title={`Download ${post.title}`}
              >
                <HiDownload className="text-lg cursor-pointer hover:text-gray-300 transition-colors duration-300" />
              </a>
            </div>
            <h2 className="text-xl text-white mt-2">{post.title}</h2>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default PostCard;
// "use client";

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Masonry from 'react-masonry-css';
// import { HiDownload } from 'react-icons/hi';
// import BlurFade from "@/components/magicui/blur-fade";
// import Modal from "@/app/components/UI/Modal"; // Ensure the path is correct

// type Post = {
//   _id: string;
//   title: string;
//   description: string;
//   imageUrl?: string;
// };

// type PostCardProps = {
//   posts: Post[];
// };

// const PostCard: React.FC<PostCardProps> = ({ posts }) => {
//   const breakpointColumnsObj = {
//     default: 3,
//     1100: 2,
//     700: 1
//   };

//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);

//   const handlePostClick = (post: Post) => {
//     console.log("Post clicked:", post);
//     setSelectedPost(post);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedPost(null);
//   };

//   return (
//     <>
//       <Masonry
//         breakpointCols={breakpointColumnsObj}
//         className="my-masonry-grid"
//         columnClassName="my-masonry-grid_column"
//       >
//         {posts.map((post, idx) => (
//           <div
//             key={post._id}
//             className="relative mb-4 break-inside-avoid rounded-sm overflow-hidden group cursor-pointer"
//           // Open modal on click
//           >
//             {post.imageUrl && (
//               <BlurFade key={post.imageUrl} delay={0.25 + idx * 0.05} inView>
//                 <div className="relative w-full h-auto">
//                   <Image

//                     src={post.imageUrl}
//                     alt={post.title}
//                     width={800}
//                     height={0}
//                     loading="lazy"
//                     className="object-cover object-center w-full h-auto transition-transform duration-300 ease-in-out transform scale-105"
//                   />
//                 </div>
//               </BlurFade>
//             )}
//             <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
//               <div className="flex justify-between items-center text-white">
//                 <span className="text-sm">Username</span>
//                 <a
//                   href={post.imageUrl}
//                   download
//                   className="text-lg cursor-pointer hover:text-gray-300 transition-colors duration-300"
//                   title={`Download ${post.title}`}
//                 >
//                   <HiDownload className="text-lg cursor-pointer hover:text-gray-300 transition-colors duration-300" />
//                 </a>
//               </div>
//               <h2 className="text-xl text-white mt-2">{post.title}</h2>
//             </div>
//           </div>
//         ))}
//       </Masonry>

//       {/* Modal for displaying post details */}
//       {/* {selectedPost && (
//         <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
//           <div>
//             <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-auto mb-4 rounded" />
//             <h2 className="text-xl font-bold">{selectedPost.title}</h2>
//             <p className="mt-2">{selectedPost.description}</p>
//           </div>
//         </Modal>
//       )} */}
//     </>
//   );
// };

// export default PostCard;
