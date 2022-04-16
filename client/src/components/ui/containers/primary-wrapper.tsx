import Link from "next/link";
import React, { useState } from "react";

interface PrimaryWrapperProps {}

const menu = [
  { name: "Questions", href: "/questions", icon: "/icons/list.svg" },
  { name: "Tags", href: "/tags", icon: "/icons/tag.svg" },
  { name: "Ranking", href: "/ranking", icon: "/icons/award.svg" },
];

const socials = [
  { name: "github", href: "www.github.com", icon: "/icons/social/github.svg" },
  {
    name: "instagram",
    href: "www.instagram.com",
    icon: "/icons/social/instagram.svg",
  },
  {
    name: "facebook",
    href: "www.facebook.com",
    icon: "/icons/social/fb.svg",
  },
];

const personal_navigation = [
  {
    name: "Your questions",
    href: "/profile/question",
    icon: "/icons/social/help-circle.svg",
  },
  {
    name: "Your answers",
    href: "/profile/answer",
    icon: "/icons/social/message-circle.svg",
  },
  {
    name: "Your likes & votes",
    href: "/profile/likes-votes",
    icon: "/icons/social/heart.svg",
  },
];

export const PrimaryWrapper: React.FC<PrimaryWrapperProps> = ({ children }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <section className="grid grid-cols-12">
      <div className="col-span-2 py-12 flex flex-col">
        <div className="flex-1">
          <div
            className="flex space-x-4 py-2 px-8 cursor-pointer"
            onClick={() => setShowSearchBar(true)}
          >
            <img src="/icons/search.svg" alt="search icon" />
            <span>Search</span>
          </div>

          <div className="mt-5">
            <span className="py-2 px-8 text-gray-primary uppercase text-[12px] font-medium">
              Menu
            </span>
            <ul className="flex flex-col space-y-3">
              {menu.map(({ href, icon, name }) => (
                <Link key={name} href={href}>
                  <a className="flex space-x-4 hover:bg-secondary hover:bg-opacity-20 transition-all duration-300 hover:text-secondary py-2 px-8 relative group hover:border-l-[6px] border-secondary cursor-pointer text-black">
                    <img src={icon} alt={`${name} icon`} />
                    <span className="text-[13px] font-medium">{name}</span>
                    {/* <div className="absolute h-full w-1 group-hover:block hidden bg-secondary left-0 top-0" /> */}
                  </a>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-8 py-4 flex space-x-5 justify-center items-center ">
          {socials.map(({ href, icon, name }) => (
            <Link key={name} href={href}>
              <a className="cursor-pointer hover:scale-110 transition-all duration-500">
                <img src={icon} alt={`${name} icon`} />
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-10">{children}</div>
    </section>
  );
};
