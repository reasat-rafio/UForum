import { Form } from "@components/post/form";
import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import axios from "axios";

interface IProps {
  data: {
    post: IPost;
  };
}
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios("http://localhost:8080/posts");
  const paths = data.map((post: IPost) => {
    return {
      params: { id: post.id },
    };
  });
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postID = context?.params?.id;
  const { data } = await axios(`http://localhost:8080/post/${postID}`);
  return {
    props: { data: data },
  };
};

const Edit: NextPage<IProps> = ({ data: { post } }) => {
  return (
    <PrimaryWrapper>
      <div className="min-h-screen bg-light-gray grid grid-cols-12 pt-32">
        <Form actonType="edit" data={post} className="col-span-9 mx-10" />

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

export default Edit;
