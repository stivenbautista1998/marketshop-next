import { useContext } from "react";
import { Home } from "@templates/Home";
import { AuthContext } from "@context/AuthContext";

export default function HomeApp() {
  const {
    currentUser,
    setCurrentUser,
    synchronizeCurrentUser
  } = useContext(AuthContext);

  return (
    <Home
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      synchronizeCurrentUser={synchronizeCurrentUser}
    />
  )
}
