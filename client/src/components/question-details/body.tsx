import React from "react";
import clsx from "clsx";
import { DateTime } from "luxon";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { Comment } from "./comment";
import { Description } from "./description";
import { Bottom } from "./bottom";

interface BodyProps {
  className?: string;
  post: IPost;
}

export const Body: React.FC<BodyProps> = ({
  className,
  post: { id, title, createdAt, description, comments, postedBy },
}) => {
  const date = new Date(+createdAt / 1000);
  const myDateTime = DateTime.fromSeconds(Number(date)).toLocaleString(
    DateTime.DATETIME_MED
  );

  return (
    <div
      className={clsx(
        className,
        "flex flex-col space-y-5 divide-y divide-[#808080]/30"
      )}
    >
      <div>
        <h1 className="text-3xl font-semibold font-mono">{title}</h1>
        <div className="text-sm">Asked {myDateTime}</div>
      </div>
      <Description
        description={description}
        myDateTime={myDateTime}
        postedBy={postedBy}
      />
      <Bottom comments={comments} />
    </div>
  );
};
