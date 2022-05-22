import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
interface StickyInfoComponentProps {
  className?: string;
  posts: IPost[] | undefined;
  header: string;
}

const data = [
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
  posts,
  header,
}) => {
  return (
    <div className={clsx(className, "relative")}>
      <div className="bg-white sticky top-20 p-5 rounded flex flex-col">
        <motion.div>
          <header className="flex items-center space-x-2 py-2 border-b border-b-slate-200">
            <img className="h-8" src={"/icons/star.svg"} alt="" />
            <h4 className="text-base">{header}</h4>
          </header>
          <ul className="list-disc list-inside py-3 space-y-1">
            {posts?.map(({ title, id }) => (
              <li className="text-sm text-blue-600 hover:underline" key={id}>
                <a href={`/question/${id}`}>{title}</a>
              </li>
            ))}
          </ul>
        </motion.div>
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
