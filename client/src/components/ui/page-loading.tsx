import React from "react";
import animationData from "../../../public/animation/99280-beezhive-splash-loading-animation.json";
import Lottie from "react-lottie";

interface PageLoadingProps {}

export const PageLoading: React.FC<PageLoadingProps> = ({}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-screen w-screen bg-black bg-opacity-70 flex justify-center items-center">
      <Lottie height={300} width={300} options={defaultOptions} />
    </div>
  );
};
