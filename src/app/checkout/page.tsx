"use client";

import Layout from "@/components/Layout";
import StyledButton from "@/components/StyledButton";
import { useAuth } from "@/components/UserContext";
import { dateConverter } from "@/utils/dateConverter";

export default function Checkout() {
  const { user, basket } = useAuth();
  
  return (
    <Layout>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start gap-16 px-4 md:px-0 w-full md:w-5/6 xl:w-2/3 py-20">
        {basket ? (
          <>
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="flex flex-col">
              <h1 className="text-3xl font-light">
                Checkout
              </h1>
              <p className="pb-4 text-xs text-gray-500 border-b-2 border-pink-200">Check your order to make sure everything is shipshape and looking good.</p>

              </div>
              {basket.order_items.map((item) => (
                <div
                  key={item.event_ticket_id}
                  className="grid grid-cols-4 gap-8 justify-center items-center w-full border-b-2 border-pink-200 pb-8"
                >
                  <div className="flex flex-col justify-center col-span-2">
                    <p className="text-xs text-gray-500">
                      {item.event_name} on {dateConverter(item.event_date)}
                    </p>

                    <h2 className="font-bold text-lg">{item.ticket_name}</h2>
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
                      <p className="text-xl font-light">{item.ticket_price}</p>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">QTY:</p>
                    <p className="text-xl font-light">{item.ticket_quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <section className="md:mt-16">
              <div className="lg:col-span-1 flex flex-col gap-4 p-4 border-4 border-pink-100 rounded">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                {basket.order_items.map((item) => (
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
                    £{basket.order.total_amount}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center justify-between mt-8">
                <StyledButton src="/basket" linkText="Back to Basket" />
                {user ? (
                  user.verified ? (
                    <StyledButton src="/checkout/payment" linkText="Pay" />
                  ) : (
                    <StyledButton src="/checkout" linkText="Validate Email" />
                  )
                ) : (
                  <StyledButton src="/user/register" linkText="Register" />
                )}
              </div>
            </section>
          </>
        ) : (
          <p>Nothing to checkout here.</p>
        )}
      </section>
    </Layout>
  );
}

