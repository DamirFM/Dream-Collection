"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EditUserForm from "@/app/components/editUserForm";

export default function EditProfilePage() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState({ name: "", email: "", description: "" });
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setUserData({
                name: session.user.name || "",
                email: session.user.email || "",
                description: session.user.description || "",
            });
        } else if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [session, status, router]); // Include router in the dependency array

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "authenticated") {
        // Pass the _id to the EditUserForm
        return <EditUserForm {...userData} id={session.user._id} />;
    }

    return null; // Render nothing if unauthenticated
}
