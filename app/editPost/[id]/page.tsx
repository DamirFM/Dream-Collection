import EditPostForm from "@/app/components/editPostForm";

const getPostById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error loading post:", error);
    return null;
  }
};


export default async function EditPost({ params }: any) {
  console.log(params);

  const { id } = params;
  console.log(id);
  const postData = await getPostById(id);
  console.log(postData);
  // Check if postData or post is null
  if (!postData || !postData.post) {
    console.log("Post not found or failed to load.");
    return <div className="flex flex-auto items-center justify-center mx-5">Post not found or failed to load.</div>;
  }
  const { post } = await getPostById(id);

  const { title, description } = post;

  return <EditPostForm id={id} title={title} description={description} />;


}
