import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import { Navbar } from "@components/navbar/navbar";
import "@fontsource/roboto";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <ManagedUIContext>
        <Navbar />
        <Component {...pageProps} />;
      </ManagedUIContext>
    </AnimatePresence>
  );
}

export default MyApp;
