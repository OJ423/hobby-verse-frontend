"use client";

import Layout from "@/components/Layout";
import { useAuth } from "@/components/UserContext";
import { OrderConfirmation } from "@/utils/customTypes";
import { postNewOrder } from "@/utils/orderApiCalls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Payment() {
  const [loading] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(7);
  const {user, setUser, basket, token, setToken} = useAuth();
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [orderErr, setOrderErr] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    if (basket) {
      const newOrder = {
        total_amount: basket?.order.total_amount,
        payment_status: basket?.order.payment_status,
        order_items: basket?.order_items.map((item) => {
          const newItem = {
            event_ticket_id: item.event_ticket_id,
            ticket_price: item.ticket_price,
            quantity: item.ticket_quantity,
          };
          return newItem;
        }),
      };

      const postData = async () => {
        try {
          const response = await postNewOrder(token, newOrder);
          setOrderConfirmation(response.order);
          setToken(response.token)
          localStorage.setItem('token', response.token)
        } catch (err) {
          console.log("Something went wrong", err);
          if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
              setOrderErr(
                "Your login token has expired. Please login to refresh your token and complete this payment"
              );
              setUser(null)
              setToken(null)
            }
          } else {
            // Handle other types of errors (e.g., network errors)
            setOrderErr("An unexpected error occurred. Please try again.");
          }
        }
      };
      postData();
    }

    if (counter === 0 && orderConfirmation) {
      router.push(`/user/orders/${orderConfirmation.order.id}`);
    } else {
      const timer = setTimeout(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [counter, router]);

  return (
    <>
      <Layout>
        <section className="my-42 lg:my-96">
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
                You will be redirected to the order confirmation in {counter}.
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
