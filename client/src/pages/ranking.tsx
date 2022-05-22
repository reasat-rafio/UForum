import { Page } from "@components/common/page";
import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Post } from "@components/profile/question/post";
import { PostLoading } from "@components/ui/post-loading";
import { StickyInfoComponent } from "@components/home/sticky-info-component";

const Ranking: NextPage = () => {
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
                .sort((a, b) =>
                  a.upvote - a.downVote < b.upvote - b.downVote ? 1 : -1
                )
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
            header="Must-commented posts"
            posts={posts
              ?.filter((e) => e.comments?.length)
              ?.sort((a, b) =>
                a.comments?.length > b.comments?.length ? -1 : 1
              )
              .slice(0, 5)}
            className="col-span-3 pr-4 md:pr-8 2xl:pr-16"
          />
        </div>
      </PrimaryWrapper>
    </Page>
  );
};
export default Ranking;
