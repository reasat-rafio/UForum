import { ThumbDown } from "@components/icons/thumb-down";
import { ThumbUp } from "@components/icons/thumb-up";
import { useUser } from "@contexts/user.conext";
import React from "react";
import { PostCTA } from "./post-cta";
import { PostHeader } from "./post-header";

export const Post: React.FC<IPost> = ({
  createdAt,
  title,
  description,
  tags,
  downVote,
  upvote,
}) => {
  const { user } = useUser();

  return (
    <div className="bg-white rounded p-8 space-y-5">
      <PostHeader username={user?.username} createdAt={createdAt} />
      <div className="space-y-5">
        <h2 className="font-[700] text-xl">{title}</h2>
        <p className="text-base">{description}</p>
        <ul className="flex space-x-2">
          {tags?.map((tag) => (
            <li
              className="bg-[#EAEAEA] rounded-[5px] text-[#808080] px-4 py-2 text-[11px]"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-[1px] bg-slate-200" />
      <PostCTA downVote={downVote} upvote={upvote} />
    </div>
  );
};
