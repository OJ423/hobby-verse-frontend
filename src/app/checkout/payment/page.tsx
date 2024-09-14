"use client";

import Layout from "@/components/Layout";
import StyledButton from "@/components/StyledButton";
import { useAuth } from "@/components/UserContext";
import { postNewOrder } from "@/utils/orderApiCalls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Payment() {
  const [loading] = useState<boolean>(true);
  const { user, setUser, basket, setBasket, token, setToken } = useAuth();
  const [orderErr, setOrderErr] = useState<string | null>(null);

  const router = useRouter();

  const postOrder = async () => {
    try {
      if (basket) {
        const newOrder = {
          total_amount: basket?.order.total_amount,
          payment_status: "complete",
          order_items: basket?.order_items.map((item) => {
            const newItem = {
              event_ticket_id: item.event_ticket_id,
              ticket_price: item.ticket_price,
              quantity: item.ticket_quantity,
            };
            return newItem;
          }),
        };
        const response = await postNewOrder(token, newOrder);
        setToken(response.token);
        localStorage.setItem("token", response.token);
        setBasket(null);
        router.push(`/user/orders/${response.order.order.id}`)
      }
    } catch (err) {
      console.log("Something went wrong", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setOrderErr(
            "Your login token has expired. Please login to refresh your token and complete this payment"
          );
          setUser(null);
          setToken(null);
        }
      } else {
        // Handle other types of errors (e.g., network errors)
        setOrderErr("An unexpected error occurred. Please try again.");
      }
    }
  };



  return (
    <>
      <Layout>
        <section className="my-20">
          {orderErr ? (
            <p>{orderErr}</p>
          ) : user ? (
            <>
              <div className="flex items-center gap-8 w-full justify-center mt-8">
                <ClipLoader
                  color="pink"
                  loading={loading}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <p className="text-sm font-light">
                  This is where Stripe would be integrated
                </p>
              </div>
              <p className="mt-8 p-2 bg-pink-100 text-xs font-bold text-center">
                To complete the order (or order mockup) click below.
                <div onClick={postOrder} className="mt-4">
                  <StyledButton src="" linkText="Complete Order"/>
                </div>
              </p>
            </>
          ) : (
            <p>You need to be logged in to complete this transaction.</p>
          )}
        </section>
      </Layout>
    </>
  );
}
