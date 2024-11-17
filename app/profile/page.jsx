"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
        const filterdPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filterdPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user?.id) {
        const response = await fetch(`/api/users/${session.user.id}`);
        const data = await response.json();

        setPosts(data);
      }
    };

    fetchPosts();
  }, [session]);

  if (status === "loading") {
    return <p>Loading Profile...</p>;
  }
  return (
    <Profile
      type="My"
      desc="Welcome to your personalized Profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};
export default MyProfile;
