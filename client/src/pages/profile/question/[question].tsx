import {
  PrimaryWrapper,
  socials,
} from "@components/ui/containers/primary-wrapper";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import axios from "axios";
import { Post } from "@components/profile/question/post";
import Link from "next/link";
import { ProfileCard } from "@components/profile/profile-card";

interface IProps {
  data: {
    posts: IPost[];
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios("http://localhost:8080/users");
  const paths = data.map((usr: IUser) => {
    return {
      params: { question: usr.id },
    };
  });
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const userID = context?.params?.question;
  const { data } = await axios(`http://localhost:8080/posts/${userID}`);
  return {
    props: { data: data }, // will be passed to the page component as props
  };
};

const Question: NextPage<IProps> = ({ data: { posts } }) => {
  return (
    <PrimaryWrapper>
      <div className="min-h-screen bg-light-gray grid grid-cols-12 py-32">
        <div className="col-span-9 mx-10 flex flex-col space-y-4">
          {posts?.length ? (
            posts
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
              .map((post) => <Post key={post.id} {...post} />)
          ) : (
            <div>No post Found</div>
          )}
        </div>

        <div className="col-span-3 pr-4 md:pr-8 2xl:pr-16 relative">
          <ProfileCard
            imageUrl={posts[0].postedBy.imageUrl}
            username={posts[0].postedBy.username}
            description={
              posts?.length ? `${posts?.length} total posts` : "No Post"
            }
          />
        </div>
      </div>
    </PrimaryWrapper>
  );
};

export default Question;
