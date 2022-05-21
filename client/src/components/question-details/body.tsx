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

  console.log("====================================");
  console.log(_post.comments);
  console.log("====================================");
  return (
    <div
      className={clsx(
        className,
        "flex flex-col space-y-5 divide-y divide-[#808080]/30"
      )}
    >
      <div>
        <h1 className="text-3xl font-semibold font-mono">{_post.title}</h1>
        <div className="text-sm">Asked {myDateTime}</div>
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
