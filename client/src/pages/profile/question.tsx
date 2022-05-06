import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import { NextPage } from "next";
import React from "react";
import axios from "axios";
import { useUser } from "@contexts/user.conext";
import { Post } from "@components/profile/question/post";

const Question: NextPage = () => {
  const { user } = useUser();

  return (
    <PrimaryWrapper>
      <div className="min-h-screen bg-light-gray grid grid-cols-12 py-32">
        <div className="col-span-9 mx-10 flex flex-col space-y-4">
          {user?.posts?.length ? (
            user?.posts
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
              .map((post) => <Post key={post.id} {...post} />)
          ) : (
            <div>No post Found</div>
          )}
        </div>

        <div className="col-span-3 pr-4 md:pr-8 2xl:pr-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut unde,
          laboriosam vero ipsum consequatur deleniti architecto a officia
          distinctio, dolor dignissimos eligendi soluta odio, quaerat sint
          earum. Assumenda, sit. Dolore.
        </div>
      </div>
    </PrimaryWrapper>
  );
};

export default Question;
