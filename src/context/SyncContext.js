import * as React from 'react';

const SyncContext = React.createContext();

/**
 * @param  {object} {children}
 * @return {object}
 * new context used to synchronize the the app info between different tabs.
 * It returns a React element with the context info that will inherit all its children.
 */
function SyncInfoProvider({ children }) {
  const [cacheUserInfo, setCacheUserInfo] = React.useState({ newValue: '', oldValue: '' });
  const [cacheKeys, setCacheKeys] = React.useState({ ordersUpdate: false, userUpdate: false });

  return (
    <SyncContext.Provider
      value={{
        cacheUserInfo,
        setCacheUserInfo,
        cacheKeys,
        setCacheKeys,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}

export { SyncInfoProvider, SyncContext };
