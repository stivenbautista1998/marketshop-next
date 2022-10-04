/* import { useContext } from 'react';
import AppContext from '@context/AppContext'; */
import { RouteGuard } from '@components/RouteGuard';
// import { MyOrderDetail } from '@templates/MyOrderDetail';

function myOrderDetail({ orderInfo }) {
  console.log({ orderInfo });

  return (
    <RouteGuard>
      <h2>Detail Section</h2>
    </RouteGuard>
  );
}

/* export const getStaticPaths = () => {
  // add async if necessary
  console.log('starts detail page!!');

  const { currentState } = useContext(AppContext);
  const paths = currentState.orders.map((order) => ({
    params: { id: order.id }, // have to be as a string the result.
  }));

  return {
    paths,
    fallback: false,
  };
};
 */
/* export const getStaticProps = ({ params }) => {
  // add async if necessary
  const data = getUserOrderById(params.id); // need to create the func getUserOrderById.

  return {
    props: {
      orderInfo: data,
    },
  };
}; */

// <MyOrderDetail />

export default myOrderDetail;
