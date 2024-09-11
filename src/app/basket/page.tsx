"use client";

import Layout from "@/components/Layout";
import StyledButton from "@/components/StyledButton";
import { useAuth } from "@/components/UserContext";
import { dateConverter } from "@/utils/dateConverter";
import { useRouter } from "next/navigation";
import { RiDeleteBinLine } from "react-icons/ri";

export default function Basket() {
  const { user, basket, setBasket } = useAuth();
  const router = useRouter()

  const handleDeleteItem = (index: number) => {
    if (!basket || !setBasket) return;

    const updatedOrderItems = basket.order_items.filter((_, i) => i !== index);
    console.log(updatedOrderItems)
    if (updatedOrderItems.length === 0) {
      console.log("hello")
      setBasket(null)
      localStorage.setItem('basket', "null")
      router.push('/events')
      return;
    }

    // Recalculate the total amount if needed
    const updatedTotalAmount = updatedOrderItems.reduce((total, item) => {
      return total + item.ticket_quantity * item.ticket_price; // Use the actual ticket price
    }, 0);

    // Update the basket in context
    const updatedBasket = ({
      ...basket,
      order_items: updatedOrderItems,
      order: {
        ...basket.order,
        total_amount: updatedTotalAmount
      }
    });
    setBasket(updatedBasket)
    localStorage.setItem('basket', JSON.stringify(updatedBasket))
  };
  console.log(basket)
  return (
    <Layout>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start gap-16 px-4 md:px-0 w-full md:w-5/6 xl:w-2/3 py-20">
        {basket ? (
          <>
            <div className="lg:col-span-2 flex flex-col gap-8">
              <h1 className="text-3xl font-light pb-4 border-b-2 border-pink-200">
                Your Basket
              </h1>
              {basket.order_items.map((item, index) => (
                <div
                  key={item.event_ticket_id}
                  className="grid grid-cols-5 gap-8 justify-center items-center w-full border-b-2 border-pink-200 pb-8"
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
                  <RiDeleteBinLine
                    onClick={() => handleDeleteItem(index)}
                    size={42}
                    className="text-pink-500 cursor-pointer transition-all duration-500 hover:text-pink-300"
                  />
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
                <StyledButton src="/events" linkText="Keep Shopping" />
                {user ? (
                  user.verified ? (
                    <StyledButton src="/checkout" linkText="Checkout" />
                  ) : (
                    <StyledButton src="/user/verify-email" linkText="Validate Email" />
                  )
                ) : (
                  <StyledButton src="/user/register" linkText="Register / Login" />
                )}
              </div>
            </section>
          </>
        ) : (
          <p>Your basket is empty</p>
        )}
      </section>
    </Layout>
  );
}
