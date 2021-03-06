import React, { Dispatch, SetStateAction, useState } from "react";
import { PostCTA } from "./post-cta";
import { PostHeader } from "./post-header";
import { AnimatePresence, motion } from "framer-motion";
import { Comment } from "@components/post/comment";
import { useRouter } from "next/router";
import { truncate } from "@libs/helpers";

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
  comments,
}) => {
  const router = useRouter();

  const [showComment, setShowComment] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="bg-white rounded p-8 space-y-5">
        <PostHeader
          id={id}
          setState={setState}
          username={postedBy?.username}
          createdAt={createdAt}
          profilePicture={postedBy?.imageUrl}
        />
        <div className="space-y-5">
          <h2
            className="cursor-pointer hover:text-secondary 
          transition-colors duration-200 font-[700] text-xl"
            onClick={() => {
              router.push(`/question/${id}`);
            }}
          >
            {title}
          </h2>
          <p className="text-base">{truncate(description, 800)}</p>
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
          setShowComment={setShowComment}
          setState={setState}
          id={id}
          downVote={downVote}
          upvote={upvote}
          likedBy={likedBy}
          dislikedBy={dislikedBy}
          posts={posts}
          commentLength={comments?.length ?? 0}
          bookmarks={postedBy.bookmarks}
        />
      </div>
      <AnimatePresence exitBeforeEnter>
        {showComment && (
          <Comment
            setState={setState}
            posts={posts}
            postID={id}
            comments={comments}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
