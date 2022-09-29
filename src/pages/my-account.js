import { MyAccount } from '@templates/MyAccount';
import { RouteGuard } from "@components/RouteGuard";

const myAccount = () => {
  return (
    <RouteGuard>
      <MyAccount />
    </RouteGuard>
  );
};

export default myAccount;

/*
currentUser={currentUser}
editCurrentUserInfo={editCurrentUserInfo}
validateUser={validateUser}
syncAuth={syncAuth}
synchronizeCurrentUser={synchronizeCurrentUser}
*/
