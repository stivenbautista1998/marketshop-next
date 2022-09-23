import * as React from 'react';
import { useRouter } from 'next/router';
import { SyncContext } from '@context/SyncContext';

const withStorageListener = (WrapperElement) => {
    return function SyncAlertWithProps(props) {
        const [ visibility, setVisibility ] = React.useState(false);
        const { cacheUserInfo, setCacheUserInfo, cacheKeys, setCacheKeys } = React.useContext(SyncContext);
        let router = useRouter();

        React.useEffect(() => {
            const gettingStorageChanges = (event) => {
                // if there is a new order done or if the current user info has
                // been changed on a new tab this will be executed.
                const { key, newValue, oldValue } = event;
                if(key === "ORDERS_V1") {
                    console.log(event);
                    setVisibility(true);
                    if(!cacheKeys.ordersUpdate) {
                        setCacheKeys((prevState) => ({ ...prevState, ordersUpdate: true }));
                    }
                }

                if(key === "CURRENT_USER_V1") {
                    console.log(event);
                    setVisibility(true);
                    setCacheUserInfo({ newValue, oldValue });
                    if(!cacheKeys.userUpdate) {
                        setCacheKeys((prevState) => ({ ...prevState, userUpdate: true }));
                    }
                }
            }

            window.addEventListener("storage", gettingStorageChanges);

            return () => {
                window.removeEventListener("storage", gettingStorageChanges);
            }
        }, []);


        function toggleSync() {
            if(!!cacheKeys.ordersUpdate) {
                props.synchronize(false); // synchronize the orders done by the user.
            }

            if(!!cacheKeys.userUpdate) {
                if(JSON.parse(cacheUserInfo.newValue) === null) { // current logged user info.
                    props.synchronizeCurrentUser(JSON.parse(cacheUserInfo.oldValue));
                    router.push("/login");
                } else {
                    props.synchronizeCurrentUser();
                }
            }
            setCacheKeys({ ordersUpdate: false, userUpdate: false });
            setVisibility(false);
        }


        return (
            <WrapperElement
                showElement={visibility}
                onCLickHandler={toggleSync}
            />
        );
    }
};

export default withStorageListener;
