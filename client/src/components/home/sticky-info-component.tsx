import React from "react";
import clsx from "clsx";

interface StickyInfoComponentProps {
  className?: string;
}

const data = [
  {
    header: { title: "Must-read posts", icon: "/icons/star.svg" },
    posts: [
      {
        name: "Please read rules before you start working on a platform",
        url: "/",
      },
      {
        name: "Vision & Strategy of Alemhelp",
        url: "/",
      },
    ],
  },
  {
    header: { title: "Featured links", icon: "/icons/link.svg" },
    posts: [
      {
        name: "Alemhelp source-code on GitHub",
        url: "/",
      },
      {
        name: "Golang best-practices",
        url: "/",
      },
      {
        name: "Alem.School dashboard",
        url: "/",
      },
    ],
  },
];

export const StickyInfoComponent: React.FC<StickyInfoComponentProps> = ({
  className,
}) => {
  return (
    <div className={clsx(className, "relative")}>
      <div className="bg-white sticky top-20 p-5 rounded flex flex-col">
        {data.map(({ header, posts }) => (
          <div key={header.title}>
            <header className="flex items-center space-x-2 py-2 border-b border-b-slate-200">
              <img className="h-8" src={header.icon} alt={header.title} />
              <h4 className="text-base">{header.title}</h4>
            </header>
            <ul className="list-disc list-inside py-3 space-y-1">
              {posts.map(({ name, url }) => (
                <li
                  className="text-sm text-blue-600 hover:underline"
                  key={name}
                >
                  <a href={url}>{name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
