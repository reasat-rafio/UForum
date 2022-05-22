import { Page } from "@components/common/page";
import { StickyInfoComponent } from "@components/home/sticky-info-component";
import { Body } from "@components/question-details/body";
import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import { usePost } from "@contexts/post.context";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useState } from "react";

interface IProps {
  data: {
    post: IPost;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios("http://localhost:8080/posts");
  const paths = data.map((post: IPost) => {
    return {
      params: { question: post.id },
    };
  });
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postID = context?.params?.question;
  const { data } = await axios(`http://localhost:8080/post/${postID}`);
  return {
    props: {
      data,
    },
  };
};

const Question: NextPage<IProps> = ({ data: { post } }) => {
  const { posts } = usePost();

  return (
    <Page>
      <PrimaryWrapper>
        <div className="min-h-screen bg-light-gray grid grid-cols-12 pt-32">
          <Body
            className="col-span-9 mx-10 flex flex-col space-y-4 bg-white p-5 rounded"
            post={post}
          />

          <StickyInfoComponent
            posts={posts as IPost[]}
            className="col-span-3 pr-4 md:pr-8 2xl:pr-16"
          />
        </div>
      </PrimaryWrapper>
    </Page>
  );
};

export default Question;
