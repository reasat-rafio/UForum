import { DateTime } from "luxon";
import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

interface CommentProps {}

export const Comment: React.FC<IComment> = ({ comment, user, createdAt }) => {
  const date = new Date(createdAt);
  const ago = DateTime.fromISO(date.toISOString()).toRelative();
  console.log(date);

  const myDateTime = DateTime.fromSeconds(Number(date)).toLocaleString(
    DateTime.DATETIME_MED
  );

  const units = ["year", "month", "week", "day", "hour", "minute", "second"];

  return (
    <div className="py-5">
      <div className="flex space-x-2">
        <div className="transform border-gray-500">
          <img
            className="w-9 rounded-full border "
            src={user.imageUrl}
            alt={`${user.username}
            s image`}
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex space-x-2 items-center">
            <span>@{user.username}</span>
            <span className="text-xs">{ago}</span>
          </div>
          <p>{comment}</p>
          <div className="flex items-center space-x-2">
            <BiUpvote className="cursor-pointer" size={18} />
            <span className="text-xs">0</span>
            <BiDownvote className="cursor-pointer" size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
