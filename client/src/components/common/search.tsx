import React, { useRef, useEffect } from "react";
import { useUI } from "@contexts/ui.context";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import SearchBox from "./search-box";
import clsx from "clsx";

export default function Search() {
  const { displaySearch, setDisplaySearch } = useUI();
  const [searchText, setSearchText] = React.useState("");

  function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();
  }
  function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
    setSearchText(e.currentTarget.value);
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
              <div className="bg-white flex flex-col rounded-md overflow-hidden h-full max-h-64vh lg:max-h-[550px] shadow-lg p-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                est earum cum, non architecto hic, accusantium animi repellat
                temporibus suscipit aliquam eligendi consequuntur accusamus
                sunt! Natus laboriosam iure distinctio? Autem voluptas animi
                necessitatibus molestiae. At quibusdam architecto quod dolores
                veritatis porro officia eius consequuntur ipsam, saepe adipisci
                ut dicta reiciendis voluptatum nostrum aliquid sint delectus,
                nam non, accusamus earum? Voluptatem aperiam rerum tenetur
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
