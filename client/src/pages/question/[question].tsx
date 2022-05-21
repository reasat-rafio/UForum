import { Page } from "@components/common/page";
import { Body } from "@components/question-details/body";
import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

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
  return (
    <Page>
      <PrimaryWrapper>
        <div className="min-h-screen bg-light-gray grid grid-cols-12 pt-32">
          <Body
            className="col-span-9 mx-10 flex flex-col space-y-4 bg-white p-5 rounded"
            post={post}
          />

          <div className="col-span-3 pr-4 md:pr-8 2xl:pr-16">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut unde,
            laboriosam vero ipsum consequatur deleniti architecto a officia
            distinctio, dolor dignissimos eligendi soluta odio, quaerat sint
            earum. Assumenda, sit. Dolore.
          </div>
        </div>
      </PrimaryWrapper>
    </Page>
  );
};

export default Question;
