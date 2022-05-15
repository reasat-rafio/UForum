import React from "react";
import animationData from "../../../public/animation/99297-loading-files.json";
import Lottie from "react-lottie";

interface PostLoadingProps {}

export const PostLoading: React.FC<PostLoadingProps> = ({}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} />
    </div>
  );
};
