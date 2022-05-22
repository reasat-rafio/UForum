import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@contexts/user.conext";

export { RouteGuard };

const RouteGuard = ({ children }: any) => {
  const { user } = useUser();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  console.log(user);

  useEffect(() => {
    // on initial load - run auth check
    if (user) {
      setAuthorized(true);
    } else {
      authCheck(router.asPath);
    }

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/", "/ranking", "/auth/register", "/auth/login"];
    const path = url.split("?")[0];

    if (!user?.username && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/auth/register",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
};
