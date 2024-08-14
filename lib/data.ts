export const getPosts = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/posts", {
            cache: "no-cache",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        console.log("Fetched posts:", data); // Add this line for debugging
        return data;
    } catch (error) {
        console.error("Error loading Posts:", error);
        return []; // Return an empty array in case of error
    }
};
