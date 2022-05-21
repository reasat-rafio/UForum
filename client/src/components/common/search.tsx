import React, { useRef, useEffect, useState } from "react";
import { useUI } from "@contexts/ui.context";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import SearchBox from "./search-box";
import clsx from "clsx";
import { usePost } from "@contexts/post.context";
import { truncate } from "@libs/helpers";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  const { displaySearch, setDisplaySearch } = useUI();
  const { posts } = usePost();
  const [searchText, setSearchText] = React.useState("");

  const [allPosts, setAllPosts] = useState<IPost[]>(posts as IPost[]);

  function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  const seachFilterAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setSearchResult(filteredItems);
  };

  function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
    setSearchText(e.currentTarget.value);
    const filteredItems = posts
      ?.filter((pst) =>
        pst.title.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
      .slice(0, 10);
    setAllPosts(filteredItems as IPost[]);
  }
  function clear() {
    setSearchText("");
    setDisplaySearch(false);
  }

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      if (displaySearch) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [displaySearch]);

  return (
    <div className="relative" ref={ref}>
      <div
        className={clsx(displaySearch && "overlay")}
        role="button"
        onClick={() => setDisplaySearch(false)}
      />
      <div
        className={clsx(
          "drawer-search absolute top-0 z-30  transition duration-300 ease-in-out left-1/2 px-4 w-full md:w-[730px] lg:w-[930px] ",
          displaySearch
            ? "block opacity-100 visible"
            : "opacity-0 invisible hidden"
        )}
      >
        <div className="w-full flex flex-col justify-center">
          <div className="flex-shrink-0 mt-3.5 lg:mt-4 w-full">
            <div className="flex flex-col mx-auto mb-1.5 w-full shadow-xl ">
              <SearchBox
                onSubmit={handleSearch}
                onChange={handleAutoSearch}
                name="search"
                value={searchText}
                onClear={clear}
                ref={(input) => input && input.focus()}
              />
            </div>
            {searchText && (
              <div className="bg-white flex flex-col rounded-md overflow-hidden h-full max-h-64vh lg:max-h-[550px] shadow-lg divide-y">
                {allPosts
                  ?.slice(0, 5)
                  .map(({ id, title, description, postedBy, tags }) => (
                    <div
                      className="px-5 py-3 cursor-pointer hover:bg-gray-200 flex space-x-2"
                      key={id}
                      onClick={() => {
                        router.push(`/question/${id}`);
                        setDisplaySearch(false);
                      }}
                    >
                      <div>
                        <img
                          className="h-8 w-8"
                          src={postedBy.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <h4 className="font-medium text-[15px] flex-1">
                          {title}
                        </h4>
                        <p className="text-sm text-gray-primary">
                          {truncate(description, 180)}
                        </p>
                        <ul className="flex space-x-2">
                          {tags?.map((tag) => (
                            <div
                              className="bg-secondary bg-opacity-10 p-2 rounded text-xs"
                              key={tag}
                            >
                              <li>{tag}</li>{" "}
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
