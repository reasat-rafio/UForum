import { ThumbDown } from "@components/icons/thumb-down";
import { ThumbUp } from "@components/icons/thumb-up";
import { useUI } from "@contexts/ui.context";
import { useUser } from "@contexts/user.conext";
import React from "react";
import axios from "axios";

interface PostCTAProps {
  downVote: number;
  upvote: number;
  id: string;
}

export const PostCTA: React.FC<PostCTAProps> = ({ id, upvote, downVote }) => {
  const { user } = useUser();
  const { setPageLoading } = useUI();

  const onUpvoteAction = async () => {
    try {
      setPageLoading(true);

      const postID = user?.id;

      const { data } = await axios.post(
        `http://localhost:8080/post/upvote/${id}`,
        postID
      );

      console.log(data);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-1 space-x-3">
        <button
          onClick={onUpvoteAction}
          className="flex space-x-1 items-center"
        >
          <ThumbUp className="cursor-pointer" />
          <span>{upvote}</span>
        </button>
        <button className="flex space-x-1 items-center">
          <ThumbDown className="cursor-pointer" />
          <span>{downVote}</span>
        </button>
      </div>
      <div>some</div>
    </div>
  );
};
