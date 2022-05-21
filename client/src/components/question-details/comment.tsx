import { DateTime } from "luxon";
import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

interface CommentProps {}

export const Comment: React.FC<IComment> = ({ comment, user }) => {
  const date = new Date(+user.createdAt / 1000);
  const myDateTime = DateTime.fromSeconds(Number(date)).toLocaleString(
    DateTime.DATETIME_MED
  );

  return (
    <div className="py-5">
      <div className="flex space-x-5">
        <div className="flex flex-col items-center">
          <BiUpvote size={20} />
          <span>0</span>
          <BiDownvote size={20} />
        </div>
        <div className="flex-1">
          <p>{comment}</p>
        </div>
      </div>

      <div className="flex">
        <div className="rounded bg-secondary bg-opacity-20 ml-auto p-2 text-xs">
          <span>Answed {myDateTime}</span>
          <div className="flex space-x-2 items-center">
            <img
              className="w-9"
              src={user.imageUrl}
              alt={`${user.username}
            s image`}
            />
            <span>@{user.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
