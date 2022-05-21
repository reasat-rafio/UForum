import { usePost } from "@contexts/post.context";
import { useUI } from "@contexts/ui.context";
import { useUser } from "@contexts/user.conext";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PrimaryWrapperProps {}

const menu = [
  { name: "Questions", href: "/", icon: "/icons/list.svg" },
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

export const PrimaryWrapper: React.FC<PrimaryWrapperProps> = ({ children }) => {
  const { user } = useUser();
  const { setPostsAction } = usePost();
  const { setDisplaySearch } = useUI();

  const personal_navigation = [
    {
      name: "Your questions",
      href: `/profile/question/${user?.id}`,
      icon: "/icons/help-circle.svg",
    },
    {
      name: "Your answers",
      href: `/profile/answer/${user?.id}`,
      icon: "/icons/message-circle.svg",
    },
    {
      name: "Your likes & votes",
      href: "/profile/likes-votes",
      icon: "/icons/heart.svg",
    },
  ];

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios(`http://localhost:8080/posts`);
        setPostsAction(data);
      } catch (error: any) {
        console.log(error.response);
      }
    }
    fetch();
  }, []);

  return (
    <section className="grid grid-cols-12 max-w-[1920px] relative">
      <div className="col-span-2 flex flex-col h-screen sticky top-0">
        <div className="flex-1 py-[40%] flex flex-col space-y-7">
          <div
            className="flex space-x-4 py-2 pl-4 md:pl-8 2xl:pl-16 cursor-pointer"
            onClick={() => setDisplaySearch((prev) => !prev)}
          >
            <img src="/icons/search.svg" alt="search icon" />
            <span>Search</span>
          </div>

          <div>
            <span className="py-2 pl-4 md:pl-8 2xl:pl-16 text-gray-primary uppercase text-[12px] font-medium">
              Menu
            </span>
            <ul className="flex flex-col space-y-3">
              {menu.map(({ href, icon, name }) => (
                <Link key={name} href={href}>
                  <a className="flex space-x-4 hover:bg-secondary hover:bg-opacity-20 transition-all duration-300 hover:text-secondary py-2 pl-4 md:pl-8 2xl:pl-16 relative group hover:border-l-[6px] border-secondary cursor-pointer text-black">
                    <img src={icon} alt={`${name} icon`} />
                    <span className="text-[13px] font-medium">{name}</span>
                    {/* <div className="absolute h-full w-1 group-hover:block hidden bg-secondary left-0 top-0" /> */}
                  </a>
                </Link>
              ))}
            </ul>
          </div>

          {user && (
            <div>
              <span className="py-2 pl-4 md:pl-8 2xl:pl-16 text-gray-primary uppercase text-[12px] font-medium">
                Personal Navigation
              </span>
              <ul className="flex flex-col space-y-3">
                {personal_navigation.map(({ href, icon, name }) => (
                  <Link key={name} href={href}>
                    <a className="flex space-x-4 hover:bg-secondary hover:bg-opacity-20 transition-all duration-300 hover:text-secondary py-2 pl-4 md:pl-8 2xl:pl-16 relative group hover:border-l-[6px] border-secondary cursor-pointer text-black">
                      <img src={icon} alt={`${name} icon`} />
                      <span className="text-[13px] font-medium">{name}</span>
                      {/* <div className="absolute h-full w-1 group-hover:block hidden bg-secondary left-0 top-0" /> */}
                    </a>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="px-8 py-4 mb-10 flex space-x-8 justify-center items-center">
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
