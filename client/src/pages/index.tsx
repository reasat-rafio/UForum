import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PrimaryWrapper>
      <div className="h-screen bg-light-gray">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora,
        laborum!
      </div>
    </PrimaryWrapper>
  );
};

export default Home;
