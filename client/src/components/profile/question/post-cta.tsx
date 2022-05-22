import { useUI } from "@contexts/ui.context";
import { useUser } from "@contexts/user.conext";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { CommentIcon } from "@components/icons/comment";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { Bookmarks } from "@components/icons/bookmarks";

interface PostCTAProps {
  downVote: number;
  upvote: number;
  id: string;
  likedBy: IPost["likedBy"];
  dislikedBy: IPost["dislikedBy"];
  setState: Dispatch<SetStateAction<IPost[] | undefined>>;
  setShowComment: Dispatch<SetStateAction<boolean>>;
  posts?: IPost[];
  commentLength: number;
  bookmarks: IPost[];
}

export const PostCTA: React.FC<PostCTAProps> = ({
  id,
  upvote,
  downVote,
  likedBy,
  dislikedBy,
  posts,
  setState,
  setShowComment,
  commentLength,
  bookmarks,
}) => {
  const { user, setUserAction } = useUser();
  const { isPageLoading, setPageLoading } = useUI();

  const [userUpvoted, setUserUpvoted] = useState(false);
  const [userDownvoted, setUserDownvoted] = useState(false);
  const [userBookmarked, setUserBookmarked] = useState(false);

  useEffect(() => {
    const userAlreadyUpvotedThisPost = likedBy?.some((usr) =>
      typeof usr === "string" ? usr === user?.id : usr.id === user?.id
    );
    const userAlreadyDownvotedThisPost = dislikedBy?.some((usr) =>
      typeof usr === "string" ? usr === user?.id : usr.id === user?.id
    );

    // const userAlreadyBookmarkedThisPost = bookmarks?.some((post: IPost) => {
    //   return post?.id == id;
    // });

    // if (userAlreadyBookmarkedThisPost) {
    //   setUserBookmarked(true);
    // }
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

      // const updatePosts = posts?.map((post) =>
      //   post.id === data.post.id ? data.post : post
      // );

      // setState(updatePosts);
      if (voteType === "UP") {
        setUserUpvoted((prev) => !prev);
        setUserDownvoted(false);
      }
      if (voteType === "DOWN") {
        setUserDownvoted((prev) => !prev);
        setUserUpvoted(false);
      }
      setUserAction(data.user);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setPageLoading(false);
    }
  };

  const onBookMarkAction = async () => {
    const userId = user?.id;

    try {
      const { data }: { data: { user: IUser } } = await axios.post(
        `http://localhost:8080/post/bookmark/${id}`,
        { userId, userBookmarked }
      );
      setUserBookmarked((prev) => !prev);

      console.log(data);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex flex-1 space-x-3 items-center text-sm">
        <button
          disabled={isPageLoading}
          onClick={() => onVoteAction("UP")}
          className="flex space-x-1 items-center"
        >
          <BiUpvote
            className="rounded-full hover:bg-slate-100 p-1 transition-all duration-200 cursor-pointer"
            size={33}
            fill={userUpvoted ? "#F48023" : ""}
          />
        </button>
        <span>{upvote - downVote}</span>
        <button
          disabled={isPageLoading}
          onClick={() => onVoteAction("DOWN")}
          className="flex space-x-1 items-center"
        >
          <BiDownvote
            fill={userDownvoted ? "#F48023" : ""}
            className="rounded-full hover:bg-slate-100 p-1 transition-all duration-200 cursor-pointer"
            size={33}
          />
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <span
            // onClick={onBookMarkAction}
            className="rounded-full hover:bg-slate-100 p-1 transition-all duration-200 cursor-pointer"
          >
            <Bookmarks fill={userBookmarked} />
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-sm">{commentLength}</span>

          <span
            onClick={() => setShowComment((prev) => !prev)}
            className="rounded-full hover:bg-slate-100 p-1 transition-all duration-200 cursor-pointer"
          >
            <CommentIcon />
          </span>
        </div>
      </div>
    </div>
  );
};
