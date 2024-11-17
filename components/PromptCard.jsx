"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState("");
  const pathName = usePathname();
  const { data: session } = useSession();

  const handleCopy = () => {
    setCopied(post.prompt);
    window.navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            width={40}
            height={40}
            alt="user_image"
            className="rounded-full object-contain"
          />

          <div>
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy_icon"
          />
        </div>
      </div>

      <p className="font-satoshi my-4 text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer "
        onClick={handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex border-t border-gray-100 flex-center gap-4">
          <p
            className="text-sm font-inter green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-sm font-inter orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};
export default PromptCard;
