// import '../styles/globals.css'
import { AuthContextProvider } from "@context/AuthContext";
import { AppContextProvider } from "@context/AppContext";
import { SyncInfoProvider } from "@context/SyncContext";

import '@styles/global.scss';
import '@styles/icon-styles.scss';

// files that starts with "_" are not considered routes
function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <SyncInfoProvider>
          <Component {...pageProps} />
        </SyncInfoProvider>
      </AppContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp
