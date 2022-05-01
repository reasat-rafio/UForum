import { ThumbDown } from "@components/icons/thumb-down";
import { ThumbUp } from "@components/icons/thumb-up";
import React from "react";

interface PostCTAProps {
  downVote: number;
  upvote: number;
}

export const PostCTA: React.FC<PostCTAProps> = ({ upvote, downVote }) => {
  return (
    <div className="flex">
      <div className="flex flex-1 space-x-3">
        <span className="flex space-x-1 items-center">
          <ThumbUp className="cursor-pointer" />
          <span>{upvote}</span>
        </span>
        <span className="flex space-x-1 items-center">
          <ThumbDown className="cursor-pointer" />
          <span>{downVote}</span>
        </span>
      </div>
      <div>some</div>
    </div>
  );
};
