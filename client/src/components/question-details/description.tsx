import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

interface DescriptionProps {
  description: string;
  myDateTime: string;
  postedBy: IUser;
}

export const Description: React.FC<DescriptionProps> = ({
  description,
  myDateTime,
  postedBy,
}) => {
  return (
    <div className="pt-5">
      <div className="flex space-x-5">
        <div className="flex flex-col items-center">
          <BiUpvote size={30} />
          <span>0</span>
          <BiDownvote size={30} />
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
