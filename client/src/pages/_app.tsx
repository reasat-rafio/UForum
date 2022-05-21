import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext, useUI } from "@contexts/ui.context";
import { Navbar } from "@components/navbar/navbar";
import "@fontsource/roboto";
import AuthContext from "@contexts/user.conext";
import Search from "@components/common/search";
import PostsContext from "@contexts/post.context";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <AuthContext>
        <PostsContext>
          <ManagedUIContext>
            <Navbar />
            <Search />
            <Component {...pageProps} />
          </ManagedUIContext>
        </PostsContext>
      </AuthContext>
    </AnimatePresence>
  );
}

export default MyApp;
