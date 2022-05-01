import { Delete } from "@components/icons/delete";
import { Edit } from "@components/icons/edit";
import { Option } from "@components/icons/option";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { DateTime } from "luxon";
import React from "react";

interface PostHeaderProps {
  createdAt: string;
  username: string | undefined;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  createdAt,
  username,
}) => {
  const date = new Date(+createdAt / 1000);
  const myDateTime = DateTime.fromSeconds(Number(date)).toLocaleString(
    DateTime.DATETIME_MED
  );

  const onDeleteAction = () => {};

  const onEditAction = () => {};

  const menuItems = [
    { label: "edit", icon: <Delete />, action: onDeleteAction },
    { label: "delete", icon: <Edit />, action: onEditAction },
  ];

  return (
    <div className="flex items-center">
      <div className="flex-1 flex space-x-3">
        <img
          className="h-12 w-12 rounded-full"
          src="/profile-pic.png"
          alt={username}
        />
        <div className="flex flex-col space-y-1">
          <span className="text-[13px]">@{username}</span>
          <span className="text-[#808080] text-[10px]">{myDateTime}</span>
        </div>
      </div>
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
            <Menu.Items className="flex flex-col absolute left-0 bg-gray-400 p-2 rounded w-36">
              {menuItems.map(({ action, icon, label }) => (
                <Menu.Item key={label}>
                  {({ active }) => (
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
              {/* <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active && "bg-blue-500"}`}
                    href="/account-settings"
                  >
                    Account settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active && "bg-blue-500"}`}
                    href="/account-settings"
                  >
                    Documentation
                  </a>
                )}
              </Menu.Item> */}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
