import { Post } from "@components/profile/question/post";
import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";

interface IProps {
  posts: IPost[];
}

// export const getStaticProps: GetStaticProps = async () => {
//   const { data } = await axios(`http://localhost:8080/posts`);

//   return {
//     props: { posts: data ? data : false }, // will be passed to the page component as props
//   };
// };

const Home: NextPage<IProps> = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios(`http://localhost:8080/posts`);
        setPosts(data);
      } catch (error: any) {
        console.log(error.response);
      }
    }
    fetch();
  }, []);

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

export default Home;
