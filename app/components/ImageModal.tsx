import React from 'react';
import Image from 'next/image';
import { HiDownload } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5'; // Import the close icon

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, title }) => {
    if (!isOpen) return null;

    // Close modal on overlay click
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
            onClick={handleOverlayClick} // Attach click event to overlay
        >
            <div className="relative bg-white rounded-lg shadow-lg p-4 mt-12 max-w-3xl max-h-[80vh] overflow-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <IoClose size={24} />
                </button>

                {/* Image */}
                <div className="flex justify-center items-center">
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={500}
                        height={280}
                        className="object-contain max-w-full max-h-[70vh] rounded-lg"
                    />
                </div>

                {/* Download option */}
                <div className="flex justify-between items-center mt-4">
                    <span>{title}</span>
                    <a
                        href={imageUrl}
                        download
                        className="text-lg cursor-pointer hover:text-gray-500"
                        title={`Download ${title}`}
                    >
                        <HiDownload />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
