import { useUser } from "@contexts/user.conext";
import React from "react";
import { DateTime } from "luxon";

export const Post: React.FC<IPost> = ({ createdAt, title, description }) => {
  const { user } = useUser();

  const date = new Date(+createdAt / 1000);
  const myDateTime = DateTime.fromSeconds(Number(date)).toLocaleString(
    DateTime.DATETIME_MED
  );

  return (
    <div className="bg-white rounded p-8">
      {/* HEADER */}
      <div className="flex items-center">
        <div className="flex-1 flex space-x-3">
          <img
            className="h-12 w-12 rounded-full"
            src="/profile-pic.png"
            alt={user?.username}
          />
          <div className="flex flex-col space-y-1">
            <span className="text-[13px]">@{user?.username}</span>
            <span className="text-[#808080] text-[10px]">{myDateTime}</span>
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </div>
      </div>
      {/* BODY */}
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {/* CTA */}
      <div></div>
    </div>
  );
};
