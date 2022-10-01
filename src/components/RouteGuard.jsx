import { useContext } from 'react';
import { AuthContext } from "@context/AuthContext";
import { useRouter } from 'next/router';

function RouteGuard({ children }) {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  // it will enter here when the localStorage info (currentUser) is still not loaded.
  if(currentUser === undefined) return <h2>Loading Page...</h2>;
  // it will enter here when the the user is not logged in.
  if(currentUser === null) {
    router.push({
      pathname: '/login',
      query: { returnUrl: router.asPath }
    });
  } else {
    // enter here when the user is logged correctly, in other words, currentUser has the user's info.
    return children;
  }
}

export { RouteGuard };
