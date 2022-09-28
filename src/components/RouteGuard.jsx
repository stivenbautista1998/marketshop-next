import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "@context/AuthContext";
import { useRouter } from 'next/router';

function RouteGuard({ children }) {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [ authorized, setAuthorized ] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    console.log("into useEffect!");
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    console.log({ url });
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    if (currentUser === null && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  console.log({ authorized });
  return (authorized && children);
}

/* const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  if(!currentUser) {
    // user is not authenticated
    router.push("/login");
  }
  // user is authenticated
  return children;
}; */

export { /* ProtectedRoute, */ RouteGuard };
