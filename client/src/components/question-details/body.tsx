import React, { useState } from "react";
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

export const Body: React.FC<BodyProps> = ({ className, post }) => {
  const [_post, setPost] = useState(post);

  const date = new Date(+_post.createdAt / 1000);
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
        <h1 className="text-3xl font-medium ">{_post.title}</h1>
        <div className="text-sm flex space-x-4 my-2">
          <span>
            Asked Time <span className="text-secondary">{myDateTime}</span>
          </span>
          <span>
            Asked By
            <span className="text-secondary"> @{_post.postedBy.username}</span>
          </span>
        </div>
      </div>
      <Description
        description={_post.description}
        myDateTime={myDateTime}
        postedBy={_post.postedBy}
      />
      <Bottom postID={_post.id} comments={_post.comments} setPost={setPost} />
    </div>
  );
};
