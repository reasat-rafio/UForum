import { StickyInfoComponent } from "@components/home/sticky-info-component";
import { Post } from "@components/profile/question/post";
import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PostLoading } from "@components/ui/post-loading";
import { Page } from "@components/common/page";

interface IProps {
  posts: IPost[];
}

const Home: NextPage<IProps> = () => {
  const [posts, setPosts] = useState<IPost[] | undefined>([]);

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
  }, [posts]);

  return (
    <Page>
      <PrimaryWrapper>
        <div className="min-h-screen bg-light-gray grid grid-cols-12 py-32">
          <motion.div className="col-span-9 mx-10 flex flex-col space-y-4">
            {posts?.length ? (
              posts
                .filter(({ removed }) => !removed)
                .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                .slice(0, 5)
                .map((post) => (
                  <Post
                    key={post.id}
                    {...post}
                    setState={setPosts}
                    posts={posts}
                  />
                ))
            ) : (
              <PostLoading />
            )}
          </motion.div>

          <StickyInfoComponent
            posts={posts}
            className="col-span-3 pr-4 md:pr-8 2xl:pr-16"
          />
        </div>
      </PrimaryWrapper>
    </Page>
  );
};

export default Home;
