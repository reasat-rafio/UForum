import React, { Dispatch, SetStateAction } from "react";
import { PostCTA } from "./post-cta";
import { PostHeader } from "./post-header";
import { motion } from "framer-motion";

interface IProps extends IPost {
  setState: Dispatch<SetStateAction<IPost[] | undefined>>;
  posts?: IPost[];
}

export const Post: React.FC<IProps> = ({
  createdAt,
  title,
  description,
  tags,
  downVote,
  upvote,
  id,
  likedBy,
  dislikedBy,
  postedBy,
  setState,
  posts,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded p-8 space-y-5"
    >
      <PostHeader
        id={id}
        setState={setState}
        username={postedBy?.username}
        createdAt={createdAt}
        profilePicture={postedBy?.imageUrl}
      />
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
      <PostCTA
        setState={setState}
        id={id}
        downVote={downVote}
        upvote={upvote}
        likedBy={likedBy}
        dislikedBy={dislikedBy}
        posts={posts}
      />
    </motion.div>
  );
};
