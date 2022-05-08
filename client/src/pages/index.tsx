import { PrimaryWrapper } from "@components/ui/containers/primary-wrapper";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    async function asd() {
      const asd = await axios("http://localhost:8080/users");
      console.log(asd);
    }
    asd();
  });

  return (
    <PrimaryWrapper>
      <div className="min-h-screen bg-light-gray">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora,
        laborum!
      </div>
    </PrimaryWrapper>
  );
};

export default Home;
