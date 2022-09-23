import { useEffect } from 'react';
import { useStorageAuth } from './useStorageAuth';

const defaultUser = [
    {
        id: "user-key-995701412669",
        username: "stivenbautista",
        image: "",
        email: "root@gmail.com",
        passWord: "1234567"
    }
];

const useAuth = () => {
    const {
        usersInfo: userInfo,
        currentUser,
        saveUsersInfo: setUserInfo,
        saveCurrentUser: setCurrentUser,
        syncAuth,
        synchronizeCurrentUser
    } = useStorageAuth("USERS_V1", "CURRENT_USER_V1", defaultUser);

    console.log({ userInfo });
    console.log({ currentUser });

    useEffect(() => {
        // synchronizing the global users state with the currently updated logged user info.
        const updatedUserInfo = userInfo.map((item) => {
            if(item.id === currentUser?.id) {
                return { ...currentUser };
            } else {
                return item;
            }
        });
        setUserInfo(updatedUserInfo);

    }, [currentUser]);


    /**
     * @param  {object} newUserInfo
     * Call this function when you want to add a new user.
     */
    const addNewUser = ( newUserInfo ) => {
        setUserInfo([ ...userInfo, newUserInfo ]);
    };

    /**
     * @param  {string} email
     * @param  {string} password
     * @return {object}
     * Call this function when you want to authenticate the user,
     * It returns an object with all the user info if it does exist. Otherwise, it will return false.
     */
    const validateUser = ( email, password, login = false ) => {
        let authentic = false;
        if(login) { // this validates if the login info is right
            userInfo.forEach((user) => {
                if(user.email === email && user.passWord === password) {
                    authentic = user;
                }
            });
        } else { // this just validate if there is a user with the same email
            userInfo.forEach((user) => {
                if(user.email === email) {
                    authentic = user;
                }
            });
        }

        return authentic;
    };

    console.log({ validateUser });

    const editCurrentUserInfo = ( editedUserInfo ) => {
        setCurrentUser({
            ...editedUserInfo,
            id: currentUser.id
        });

        const updatedUsersInfo = userInfo.map((item) => {
            if(item.id === currentUser.id) {
                return {
                    ...editedUserInfo,
                    id: currentUser.id
                }
            } else {
                return item;
            }
        })
        setUserInfo(updatedUsersInfo);
    }

    return {
        userInfo,
        currentUser,
        setCurrentUser,
        validateUser,
        addNewUser,
        editCurrentUserInfo,
        syncAuth,
        synchronizeCurrentUser
    };
};

export { useAuth };
