import { Form } from "@components/question/form";
import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import type { NextPage } from "next";

const Submit: NextPage = () => {
  return (
    <PrimaryWrapper>
      <div className="min-h-screen bg-light-gray grid grid-cols-12 pt-32">
        <Form className="col-span-9 mx-10" />

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

export default Submit;
