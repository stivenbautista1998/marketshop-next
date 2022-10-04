import { useContext } from 'react';
import { Home } from '@templates/Home';
import Head from 'next/head';
import { AuthContext } from '@context/AuthContext';
import { RouteGuard } from '@components/RouteGuard';

export default function HomeApp() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  return (
    <RouteGuard>
      <Head>
        <title>MarketShop Home</title>
      </Head>
      <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </RouteGuard>
  );
}
