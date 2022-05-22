import { Delete } from "@components/icons/delete";
import { Edit } from "@components/icons/edit";
import { Option } from "@components/icons/option";
import { useUI } from "@contexts/ui.context";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import clsx from "clsx";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import React, { SetStateAction } from "react";
import { Dispatch } from "react";

interface PostHeaderProps {
  createdAt: string;
  username: string | undefined;
  profilePicture: string | undefined;
  id: string;
  setState: Dispatch<SetStateAction<IPost[] | undefined>>;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  createdAt,
  username,
  profilePicture,
  id,
  setState,
}) => {
  const { setPageLoading } = useUI();

  const router = useRouter();

  const date = new Date(+createdAt / 1000);
  const myDateTime = DateTime.fromSeconds(Number(date)).toLocaleString(
    DateTime.DATETIME_MED
  );

  const onDeleteAction = async () => {
    try {
      await axios.post(`http://localhost:8080/post/delete/${id}`);
      setState((prev) => prev?.filter((post) => post.id !== id));
    } catch (error: any) {
      console.log(error.response);
    } finally {
    }
  };

  const onEditAction = () => {
    router.replace(`/post/edit/${id}`);
  };

  const menuItems = [
    { label: "edit", icon: <Edit />, action: onEditAction },
    { label: "delete", icon: <Delete />, action: onDeleteAction },
  ];

  return (
    <div className="flex items-center">
      <div className="flex-1 flex space-x-3">
        <img
          className="h-12 w-12 rounded-full"
          src={profilePicture}
          alt={`${username}'s image`}
        />
        <div className="flex flex-col space-y-1">
          <span className="text-[13px]">@{username}</span>
          <span className="text-[#808080] text-[10px]">{myDateTime}</span>
        </div>
      </div>

      {router.pathname !== "/" && router.pathname !== "/ranking" && (
        <div className="relative">
          <Menu>
            <Menu.Button className="p-2 hover:bg-gray-200 transition-all duration-200 rounded-full">
              <Option />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="flex flex-col absolute -left-10 bg-gray-400 p-2 rounded w-36">
                {menuItems.map(({ action, icon, label }) => (
                  <Menu.Item key={label}>
                    {({}) => (
                      <li
                        onClick={action}
                        className={clsx(
                          "flex items-center space-x-4 py-2 p-3 hover:bg-secondary rounded cursor-pointer"
                        )}
                      >
                        {icon}
                        <p className="flex justify-center items-center">
                          {label}
                        </p>
                      </li>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </div>
  );
};
