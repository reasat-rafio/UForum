import Button from "@components/ui/button";
import { useUser } from "@contexts/user.conext";
import { useWindowScroll } from "@libs/hooks";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HamburgerCTA } from "./hamburger-cta";

interface NavbarProps {}

const profileDropDown = [
  { name: "Setting", url: "/setting" },
  { name: "Sign Out", url: "/" },
];

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { user, removeUserAction } = useUser();

  const router = useRouter();
  const scroll = useWindowScroll()?.y ?? 0;

  const [dropwdown, setDropDown] = useState(false);

  return (
    <nav
      className={clsx(
        "bg-white border-gray-200 px-2 sm:px-4 rounded dark:bg-white fixed w-full transition-all duration-300 z-20 top-0",
        scroll ? "shadow-md py-3" : "shadow-sm py-6"
      )}
    >
      <div className="section__container flex flex-wrap justify-between items-center">
        <Link href="/">
          <a
            className={clsx(
              "flex items-center transition-all duration-300",
              scroll ? "scale-100" : "scale-125"
            )}
          >
            <img
              src="/icons/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="UForum Logo"
            />
            <span className="self-center text-xl whitespace-nowrap dark:text-back">
              <span className="font-bold text-secondary">U</span>Forum
            </span>
          </a>
        </Link>

        <div className="flex space-x-4">
          {user ? (
            <>
              <Button
                onClick={() => router.push("/post/submit")}
                variant="secondary"
                icon={{
                  position: "left",
                  component: (
                    <img
                      src="/icons/plus-circle.svg"
                      alt="ask a question icon"
                    />
                  ),
                }}
              >
                Ask a question
              </Button>
              <div className="relative ">
                <button
                  type="button"
                  className="flex mr-3 text-sm rounded-full h-full justify-center items-center space-x-2"
                  id="user-menu-button"
                  onClick={() => setDropDown((prev) => !prev)}
                >
                  <img
                    className="w-9 h-9 rounded-full border border-gray-600"
                    src={user?.imageUrl}
                    alt="user photo"
                  />

                  <img
                    className="h-2 w-2 rounded-full"
                    src="/icons/down.svg"
                    alt="user photo"
                  />
                </button>
                {dropwdown && (
                  <div
                    className="absolute top-9 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown"
                  >
                    <div className="py-3 px-4">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {user.username}
                      </span>
                      <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                      </span>
                    </div>
                    <ul className="py-1" aria-labelledby="dropdown">
                      {profileDropDown.map(({ name, url }) => (
                        <li key={name}>
                          <a
                            onClick={(e) => {
                              if (name === "Sign Out") {
                                e.preventDefault();
                                removeUserAction();
                              }
                            }}
                            href={url}
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            {name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button
                type="submit"
                variant="secondary"
                icon={{
                  position: "left",
                  component: (
                    <img src="/icons/user-plus.svg" alt="register icon" />
                  ),
                }}
                onClick={() => router.push("/auth/register")}
              >
                Register
              </Button>
              <Button onClick={() => router.push("/auth/login")} type="submit">
                Login
              </Button>
            </>
          )}

          <HamburgerCTA />
        </div>
      </div>
    </nav>
  );
};
