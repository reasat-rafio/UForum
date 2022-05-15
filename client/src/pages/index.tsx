import { StickyInfoComponent } from "@components/home/sticky-info-component";
import { Post } from "@components/profile/question/post";
import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";

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
  }, []);

  console.log(posts);

  return (
    <PrimaryWrapper>
      <div className="min-h-screen bg-light-gray grid grid-cols-12 py-32">
        <div className="col-span-9 mx-10 flex flex-col space-y-4">
          {posts?.length ? (
            posts
              .filter(({ removed }) => !removed)
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
              .map((post) => (
                <Post
                  key={post.id}
                  {...post}
                  setState={setPosts}
                  posts={posts}
                />
              ))
          ) : (
            <div>No post Found</div>
          )}
        </div>

        <StickyInfoComponent className="col-span-3 pr-4 md:pr-8 2xl:pr-16" />
      </div>
    </PrimaryWrapper>
  );
};

export default Home;
