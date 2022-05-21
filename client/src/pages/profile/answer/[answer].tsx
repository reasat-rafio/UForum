import { Post } from "@components/profile/question/post";
import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

interface IProps {
  data: {
    comments: IComment[];
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios("http://localhost:8080/users");
  const paths = data.map((usr: IUser) => {
    return {
      params: { answer: usr.id },
    };
  });
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const userId = context?.params?.answer;
  const { data } = await axios(`http://localhost:8080/comments/${userId}`);
  return {
    props: { data: data }, // will be passed to the page component as props
  };
};

const Answer: NextPage<IProps> = ({ data: { comments } }) => {
  const router = useRouter();
  console.log(comments);

  return (
    <PrimaryWrapper>
      <div className="min-h-screen bg-light-gray grid grid-cols-12 py-32">
        <div className="col-span-9 mx-10 flex flex-col space-y-4">
          <div>
            {comments?.length ? (
              <h1>{comments?.length} Answer</h1>
            ) : (
              <h1>No Answer</h1>
            )}
          </div>
          {comments?.length ? (
            comments
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
              .map((comment) => (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/question/${comment.post}`);
                  }}
                  key={`${comment.post?.id}-${comment.id}`}
                >
                  <div
                    className="border-l-4 p-4 rounded bg-white border-secondary flex space-x-2np"
                    key={comment.id}
                  >
                    <div className="w-9 h-9 rounded">
                      <img src={comment.user.imageUrl} alt="" />
                    </div>
                    <div className="flex-1">
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div>No comment Found</div>
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

export default Answer;
