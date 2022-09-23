import { useContext } from "react";
import { Home } from "@templates/Home";
import { AuthContext } from "@context/AuthContext";
import { RouteGuard } from "@components/RouteGuard";

export default function HomeApp() {
  const {
    currentUser,
    setCurrentUser,
    synchronizeCurrentUser
  } = useContext(AuthContext);

  return (
    <RouteGuard>
      <Home
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        synchronizeCurrentUser={synchronizeCurrentUser}
      />
    </RouteGuard>
  )
}
//
