import { ThumbDown } from "@components/icons/thumb-down";
import { ThumbUp } from "@components/icons/thumb-up";
import { useUI } from "@contexts/ui.context";
import { useUser } from "@contexts/user.conext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThumbsDownSolid } from "@components/icons/thumb-down-solid";
import { ThumbUpSolid } from "@components/icons/thumb-up-solid";

interface PostCTAProps {
  downVote: number;
  upvote: number;
  id: string;
  likedBy: IPost["likedBy"];
  dislikedBy: IPost["dislikedBy"];
}

export const PostCTA: React.FC<PostCTAProps> = ({
  id,
  upvote,
  downVote,
  likedBy,
  dislikedBy,
}) => {
  const { user, setUserAction } = useUser();
  const { isPageLoading, setPageLoading } = useUI();

  const [userUpvoted, setUserUpvoted] = useState(false);
  const [userDownvoted, setUserDownvoted] = useState(false);

  useEffect(() => {
    const userAlreadyUpvotedThisPost = likedBy?.some((usr) =>
      typeof usr === "string" ? usr === user?.id : usr.id === user?.id
    );
    const userAlreadyDownvotedThisPost = dislikedBy?.some((usr) =>
      typeof usr === "string" ? usr === user?.id : usr.id === user?.id
    );

    if (userAlreadyUpvotedThisPost) {
      setUserUpvoted(true);
    }
    if (userAlreadyDownvotedThisPost) {
      setUserDownvoted(true);
    }
  }, []);

  const onUpvoteAction = async () => {
    try {
      setPageLoading(true);
      const userId = user?.id;
      const { data } = await axios.post(
        `http://localhost:8080/post/upvote/${id}`,
        { userId, userUpvoted }
      );

      setUserAction(data.user);
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
          disabled={isPageLoading}
          onClick={onUpvoteAction}
          className="flex space-x-1 items-center"
        >
          <span className="rounded-full hover:bg-slate-100 p-1 transition-all duration-200 cursor-pointer">
            {userUpvoted ? <ThumbUpSolid /> : <ThumbUp />}
          </span>
          <span>{upvote}</span>
        </button>
        <button className="flex space-x-1 items-center">
          <span className="rounded-full hover:bg-slate-100 p-1 transition-all duration-200">
            {userDownvoted ? (
              <ThumbsDownSolid />
            ) : (
              <ThumbDown className="cursor-pointer" />
            )}
          </span>

          <span>{downVote}</span>
        </button>
      </div>
      <div>some</div>
    </div>
  );
};
