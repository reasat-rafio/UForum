import { useUI } from "@contexts/ui.context";
import { useUser } from "@contexts/user.conext";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

interface DescriptionProps {
  id: string;
  description: string;
  myDateTime: string;
  postedBy: IUser;
  upvote: number;
  downVote: number;
  likedBy?: IUser[];
  dislikedBy?: IUser[];
  setPost: Dispatch<SetStateAction<IPost | undefined>>;
}

export const Description: React.FC<DescriptionProps> = ({
  description,
  myDateTime,
  postedBy,
  upvote,
  downVote,
  likedBy,
  dislikedBy,
  id,
  setPost,
}) => {
  const { user } = useUser();
  const { setPageLoading } = useUI();
  const [userUpvoted, setUserUpvoted] = useState(false);
  const [userDownvoted, setUserDownvoted] = useState(false);

  const [_upvote, setUpvote] = useState(upvote);
  const [_downvote, setDownvote] = useState(downVote);
  console.log(_upvote);

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

  const onVoteAction = async (voteType: "UP" | "DOWN") => {
    try {
      const userId = user?.id;

      const { data }: { data: { post: IPost; user: IUser } } = await axios.post(
        `http://localhost:8080/post/vote/${id}`,
        {
          userId,
          userUpvoted,
          userDownvoted,
          voteType,
        }
      );
      console.log(data);

      if (voteType === "UP") {
        setUserUpvoted((prev) => !prev);
        setUserDownvoted(false);
        if (userUpvoted) {
          setUpvote(_upvote - 1);
        } else {
          setUpvote(_upvote + 1);
        }
      }
      if (voteType === "DOWN") {
        setUserDownvoted((prev) => !prev);
        setUserUpvoted(false);
        if (userDownvoted) {
          setDownvote(_downvote - 1);
        } else {
          setDownvote(_downvote + 1);
        }
      }
    } catch (error: any) {
      console.log("here");

      console.log(error.response);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <div className="pt-5">
      <div className="flex space-x-5">
        <div className="flex flex-col items-center">
          <BiUpvote
            fill={userUpvoted ? "#F48023" : ""}
            className="cursor-pointer"
            onClick={() => onVoteAction("UP")}
            size={30}
          />
          <span>{_upvote - _downvote}</span>
          <BiDownvote
            fill={userDownvoted ? "#F48023" : ""}
            className="cursor-pointer"
            onClick={() => onVoteAction("DOWN")}
            size={30}
          />
        </div>
        <div className="flex-1">
          <p>{description}</p>
        </div>
      </div>
      <div className="flex">
        <div className="w-auto rounded bg-secondary bg-opacity-20 ml-auto p-2 text-xs">
          <span>Asked {myDateTime}</span>
          <div className="flex space-x-2 items-center">
            <img
              className="w-9"
              src={postedBy.imageUrl}
              alt={`${postedBy.username}
            s image`}
            />
            <span>@{postedBy.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
