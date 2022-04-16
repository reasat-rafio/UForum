import Button from "@components/ui/button";
import { useRouter } from "next/router";
import React from "react";
import { HamburgerCTA } from "./hamburger-cta";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-5 rounded dark:bg-white shadow-md">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <img
            src="/icons/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="UForum Logo"
          />
          <span className="self-center text-xl whitespace-nowrap dark:text-back">
            <span className="font-bold text-secondary">U</span>Forum
          </span>
        </a>
        <div className="flex space-x-4">
          <Button
            type="submit"
            variant="secondary"
            icon={{
              position: "left",
              component: <img src="/icons/user-plus.svg" alt="register icon" />,
            }}
            onClick={() => router.push("/auth/register")}
          >
            Register
          </Button>
          <Button type="submit">Login</Button>
          <HamburgerCTA />
        </div>
      </div>
    </nav>
  );
};
