import { socials } from "@components/ui/containers/primary-wrapper";
import Link from "next/link";
import React from "react";

interface ProfileCardProps {
  imageUrl: string;
  username: string;
  description: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  imageUrl,
  username,
  description,
}) => {
  return (
    <div className="bg-white sticky top-20 p-8 rounded flex flex-col justify-center items-center shadow divide-y space-y-2">
      <img className=" rounded-full border" src={imageUrl} alt="" />
      <h6 className="text-2xl font-medium w-full text-center">@{username}</h6>
      <span>{description}</span>
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
  );
};
