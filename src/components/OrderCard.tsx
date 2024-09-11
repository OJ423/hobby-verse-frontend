import { getOrders, getOrdersByUser } from "@/utils/orderApiCalls";
import { useEffect, useState } from "react";
import { useAuth } from "./UserContext";
import { OrderAPIReturn } from "@/utils/customTypes";
import axios from "axios";
import IsLoading from "./IsLoading";
import { dateConverter } from "@/utils/dateConverter";
import StyledButton from "./StyledButton";
import { usePathname } from "next/navigation";

interface OrderCardProps {
  src: string;
}

const OrderCard: React.FC<OrderCardProps> = ({src}) => {
  const { setToken, setUser } = useAuth();
  const [orders, setOrders] = useState<OrderAPIReturn[] | []>([]);
  const [ordersErr, setOrdersErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localToken = localStorage.getItem("token");
        if (pathname.includes("/user/orders")) {
          const response = await getOrdersByUser(localToken);
          setOrders(response.orders);
          setToken(response.token);
          localStorage.setItem("token", response.token);
          setLoading(false);
        }
        if (pathname.includes("/admin/orders")) {
          const response = await getOrders(localToken);
          setOrders(response.orders);
          setToken(response.token);
          localStorage.setItem("token", response.token);
          setLoading(false);
        }
      } catch (err) {
        console.log("Something went wrong", err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            console.log("Error 401 <<<<<<<<<<")
            setOrdersErr(
              "Your login token has expired. Please login to refresh your token to view these orders."
            );
            setUser(null);
            setToken(null);
            setLoading(false);
          }
          if (err.response?.status === 403) {
            setOrdersErr("You cannot see other people's orders! Naughty.");
            setLoading(false);
          }
        } else {
          // Handle other types of errors (e.g., network errors)
          setOrdersErr("An unexpected error occurred. Please try again.");
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [pathname, setToken, setUser]);

  return (
    <>
      {loading ? (
        <IsLoading loading={loading} />
      ) : ordersErr ? (
        <p>{ordersErr}</p>
      ) : orders.length ? (
        <>
          {orders.map((order) => (
            <section
              key={order.id}
              className="flex w-fit gap-8 items-center justify-between pb-4 border-b-2 border-pink-200 cursor-pointer transition-all duration-500 hover:bg-pink-100 py-2 px-4"
            >
              <p className="font-black text-3xl">{order.id}</p>
              <div className="flex flex-col">
                <p>Order No. {order.id}</p>
                <p className="font-semibold text-xs">
                  {dateConverter(order.created_at)}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-light text-gray-500 text-sm">
                  {order.customer_name}
                </p>
                <p className="font-light text-gray-500 text-sm">
                  {order.customer_email}
                </p>
              </div>
              <p className="font-bold">£{order.total_amount}</p>
              <StyledButton src={`${src}${order.id}`} linkText="View" />
            </section>
          ))}
        </>
      ) : <p>There are no orders</p>}
    </>
  );
}

export default OrderCard
