import { MyOrders } from "@templates/MyOrders";
import { RouteGuard } from "@components/RouteGuard";

function myOrders() {
  return (
    <RouteGuard>
      <MyOrders />
    </RouteGuard>
  );
};

export default myOrders;
