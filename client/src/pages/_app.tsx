import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import { Navbar } from "@components/navbar/navbar";
import "@fontsource/roboto";
import AuthContext from "@contexts/user.conext";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <AuthContext>
        <ManagedUIContext>
          <Navbar />
          <Component {...pageProps} />
        </ManagedUIContext>
      </AuthContext>
    </AnimatePresence>
  );
}

export default MyApp;
