import React from "react";

interface BookmarksProps {
  fill?: boolean;
}

export const Bookmarks: React.FC<BookmarksProps> = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill={fill ? "#F48023" : "none"}
      viewBox="0 0 24 24"
      stroke="#000"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
};
