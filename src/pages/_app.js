// import '../styles/globals.css'
import { AppContextProvider } from "@context/AppContext";
import { SyncInfoProvider } from "@context/SyncContext";
import { AuthContextProvider } from "@context/AuthContext";

import '@styles/global.scss';
import '@styles/icon-styles.scss';

// files that starts with "_" are not considered routes
function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <SyncInfoProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </SyncInfoProvider>
    </AppContextProvider>
  );
}

export default MyApp
