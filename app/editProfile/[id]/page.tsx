'use client';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProfilePage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<{ lat: number; lng: number }>({
        lat: 0,
        lng: 0,
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState<string>("");
    const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null); // State to track upload success
    const [isLoading, setIsLoading] = useState<boolean>(false); // State to track loading status

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setEmail(session.user.email || "");
            setDescription(session.user.description || "");

            if (session.user.location) {
                setLocation({
                    lat: session.user.location.lat || 0,
                    lng: session.user.location.lng || 0,
                });
            }
        }
    }, [session]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file);

            // Create a URL for the image preview
            setProfileImagePreview(URL.createObjectURL(file));
        }
    };

    const handleProfileUpdate = async () => {
        if (!session?.user?._id) {
            console.error("User is not authenticated.");
            return;
        }

        setIsLoading(true); // Set loading state to true when update starts

        let base64: string | null = null;

        if (profileImage) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                base64 = reader.result?.toString().split(",")[1] || null;
                const isSuccess = await updateProfile(base64, session.user._id);
                setUploadSuccess(isSuccess); // Set upload success based on the response
                setIsLoading(false); // Set loading state to false after update
            };
            reader.readAsDataURL(profileImage);
        } else {
            const isSuccess = await updateProfile(null, session.user._id);
            setUploadSuccess(isSuccess);
            setIsLoading(false); // Set loading state to false after update
        }
    };

    const updateProfile = async (base64: string | null, userId: string): Promise<boolean> => {
        try {
            const res = await fetch(`/api/profile/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    name,
                    email,
                    description,
                    location,
                    file: base64,
                }),
            });

            if (res.ok) {
                const updatedUser = await res.json(); // Ensure to handle the response properly
                // Update session data or use router.replace to reflect changes
                router.replace(`/profile`);
                return true; // Return true if update is successful
            } else {
                console.error("Failed to update profile");
                return false; // Return false if update fails
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            return false;
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            {/* Profile Form */}
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            {/* Other Input Fields */}
            {/* Profile Image Upload */}
            <div className="mb-4">
                <label className="block text-gray-700">Profile Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            {/* Image Preview */}
            {profileImagePreview && (
                <div className="flex justify-center mb-4">
                    <Image
                        height={100}
                        width={100}
                        src={profileImagePreview}
                        alt="User Photo"
                        className="rounded-full"
                    />
                </div>
            )}
            {/* Display upload status message */}
            {uploadSuccess === true && (
                <p className="text-green-500">Profile photo uploaded successfully!</p>
            )}
            {uploadSuccess === false && (
                <p className="text-red-500">Failed to upload profile photo. Please try again.</p>
            )}
            <button
                onClick={handleProfileUpdate}
                className="w-full bg-blue-500 text-white p-2 rounded"
                disabled={isLoading} // Disable button while loading
            >
                {isLoading ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}