"use client";

import IsLoading from "@/components/IsLoading";
import Layout from "@/components/Layout";
import { useAuth } from "@/components/UserContext";
import { OrderConfirmation } from "@/utils/customTypes";
import { dateConverter } from "@/utils/dateConverter";
import { getOrder } from "@/utils/orderApiCalls";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminOrder() {
  const { token, user, setUser, setToken } = useAuth();
  const { orderId } = useParams<{ orderId: string }>();
  const [orderFetchErr, setOrderFetchErr] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<OrderConfirmation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const handlePrint = () => {
    window.print()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localToken = localStorage.getItem("token");
        const response = await getOrder(localToken, orderId);
        setToken(response.token);
        localStorage.setItem("token", response.token);
        setOrderData(response.order);
        setLoading(false);
      } catch (err) {
        console.log("Something went wrong", err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setOrderFetchErr(
              "Your login token has expired. Please login to refresh your token to view this order."
            );
            setUser(null);
            setToken(null);
            setLoading(false);
          }
          if (err.response?.status === 403) {
            setOrderFetchErr("You cannot see other people's orders! Naughty.");
            setLoading(false);
          }
        } else {
          // Handle other types of errors (e.g., network errors)
          setOrderFetchErr("An unexpected error occurred. Please try again.");
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [orderId, token, setToken, setUser]);

  return (
    <>
      <Layout>
        <section className="my-4 w-full pt-4 md:px-0 md:w-9/12 lg:w-2/3">
          <Link
            href="/admin/orders"
            className="text-xs text-pink-500 font-bold transition-all duration-500 hover:text-gray-900"
          >
            {`< Back to orders`}
          </Link>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-center gap-16 px-4 md:px-0 w-full md:w-5/6 xl:w-2/3 py-20">
          {loading ? (
            <IsLoading loading={loading} />
          ) : orderFetchErr ? (
            <p>{orderFetchErr}</p>
          ) : user ? (
            orderData ? (
              <>
                <div className="lg:col-span-2 flex flex-col gap-8">
                  <div className="flex flex-col">
                    <h1 className="text-3xl font-light">Order Confirmation</h1>
                  </div>
                  {orderData.orderItems.map((item) => (
                    <div
                      key={item.event_ticket_id}
                      className="grid grid-cols-4 gap-8 justify-center items-center w-full border-b-2 border-pink-200 pb-8"
                    >
                      <div className="flex flex-col justify-center col-span-2">
                        <p className="text-xs text-gray-500">
                          {item.event_name} on {dateConverter(item.event_date)}
                        </p>

                        <h2 className="font-bold text-lg">
                          {item.ticket_name}
                        </h2>
                        <p className="text-sm">{item.ticket_description}</p>
                        <p className="text-xs text-gray-500">
                          {" "}
                          {`This ticket is for ${
                            item.heads_per_ticket > 1
                              ? `${item.heads_per_ticket} people`
                              : `${item.heads_per_ticket} person`
                          }`}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold">Price:</p>
                        {item.ticket_price === 0 ? (
                          <p className="text-xl font-light">FREE</p>
                        ) : item.ticket_price === null ? (
                          <p className="text-xl font-light">£0.00</p>
                        ) : (
                          <p className="text-xl font-light">
                            {item.ticket_price}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold">QTY:</p>
                        <p className="text-xl font-light">
                          {item.ticket_quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <section className="md:mt-16">
                  <div className="lg:col-span-1 flex flex-col gap-4 p-4 border-4 border-pink-100 rounded">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    {orderData.orderItems.map((item) => (
                      <div
                        key={item.event_name}
                        className="flex justify-between gap-4 pb-4 border-b border-gray-300"
                      >
                        <p className="text-sm">{item.event_name}</p>
                        <p className="text-sm">
                          {item.ticket_quantity} x {item.ticket_name}
                        </p>
                      </div>
                    ))}
                    <div className="flex justify-between gap-4">
                      <p className="text-lg font-bold">Total Amount</p>
                      <p className="text-lg font-bold">
                        £{orderData.order.total_amount}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center justify-between mt-8">
                    <button
                      onClick={handlePrint}
                      className="border-solid border-4 border-black py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out text-xs"
                    >
                      Print
                    </button>
                  </div>
                </section>
              </>
            ) : (
              <p>This order does not exist.</p>
            )
          ) : (
            <p>You need to be logged in to see orders.</p>
          )}
        </section>
      </Layout>
    </>
  );
}

