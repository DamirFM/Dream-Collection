import React, { useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { HiDownload } from 'react-icons/hi';
import BlurFade from "@/components/magicui/blur-fade";

type User = {
  _id: string;
  name: string;
};

type Post = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  userId: string | User; // Adjusted to allow for both ObjectId and populated User
  tags?: string[];
};

type PostCardProps = {
  posts: Post[];
  onImageClick: (imageUrl: string, title: string) => void; // Add this prop type
};

const PostCard: React.FC<PostCardProps> = ({ posts, onImageClick }) => {
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
          className="relative mb-4 break-inside-avoid rounded-sm overflow-hidden group"
          onClick={() => onImageClick(post.imageUrl!, post.title)} // Pass image URL and title
        >
          {post.imageUrl && (
            <BlurFade key={post.imageUrl} delay={0.25 + idx * 0.05} inView>
              <div className="relative w-full h-auto">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={800}
                  height={600}
                  layout="responsive"
                  loading="lazy"
                  onLoad={() => handleImageLoad(idx)}
                  className="object-cover object-center w-full h-auto transition-transform duration-300 ease-in-out transform scale-105"
                />
              </div>
            </BlurFade>
          )}
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-center text-white">
              {/* Check if userId is populated and display the username */}
              <span className="text-sm">
                {typeof post.userId === 'object' && post.userId !== null ? post.userId.name : 'Unknown User'}
              </span>
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
