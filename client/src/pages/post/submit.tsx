import { Form } from "@components/post/form";
import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import type { NextPage } from "next";

const Submit: NextPage = () => {
  return (
    <PrimaryWrapper>
      <div className="min-h-screen bg-light-gray grid grid-cols-12 pt-32">
        <Form className="col-span-9 mx-10" />

        <div className="col-span-3 pr-4 md:pr-8 2xl:pr-16">
          {/* <ProfileCard
            imageUrl={comments[0].user.imageUrl}
            username={comments[0].user.username}
            description={
              comments?.length
                ? `${comments?.length} total answers`
                : "No comments"
            }
          /> */}
        </div>
      </div>
    </PrimaryWrapper>
  );
};

export default Submit;
