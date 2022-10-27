import React, { createContext } from 'react';

interface SyncContextType {
  cacheUserInfo: CacheUserInfoType;
  setCacheUserInfo: React.Dispatch<React.SetStateAction<CacheUserInfoType>>;
  cacheKeys: CacheKeysType;
  setCacheKeys: React.Dispatch<React.SetStateAction<CacheKeysType>>;
}

type CacheUserInfoType = {
  newValue: string,
  oldValue: string,
}

type CacheKeysType = {
  ordersUpdate: boolean,
  userUpdate: boolean,
}

type Props = {
  // eslint-disable-next-line no-undef
  children: JSX.Element,
}

const SyncContext = createContext<SyncContextType | null>(null);

/**
 * @param  {object} {children}
 * @return {object}
 * new context used to synchronize the the app info between different tabs.
 * It returns a React element with the context info that will inherit all its children.
 */
function SyncInfoProvider({ children }: Props) {
  const [cacheUserInfo, setCacheUserInfo] = React.useState<CacheUserInfoType>({ newValue: '', oldValue: '' });
  const [cacheKeys, setCacheKeys] = React.useState<CacheKeysType>({ ordersUpdate: false, userUpdate: false });

  return (
    <SyncContext.Provider value={{
      cacheUserInfo,
      setCacheUserInfo,
      cacheKeys,
      setCacheKeys
    }}>
      {children}
    </SyncContext.Provider>
  );
}

export { SyncInfoProvider, SyncContext };
