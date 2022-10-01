import { useContext } from 'react'
import { AuthContext } from "@context/AuthContext";
import { useRouter } from 'next/router';


const LoginProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  // if the user already is logged in, then instead of going to login, go to home.
  if((currentUser !== null) && (currentUser !== undefined)) router.push("/");
  console.log("login routing!");

  return children;
};

export { LoginProtectedRoute };
