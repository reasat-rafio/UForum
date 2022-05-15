import { PageLoading } from "@components/ui/page-loading";
import { useUI } from "@contexts/ui.context";
import React from "react";

interface PageProps {}

export const Page: React.FC<PageProps> = ({ children }) => {
  const { isPageLoading } = useUI();

  return (
    <div className="relative">{isPageLoading ? <PageLoading /> : children}</div>
  );
};
