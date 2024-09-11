"use client";

import Layout from "@/components/Layout";
import OrderCard from "@/components/OrderCard";

export default function UserOrders() {
  return (
    <Layout>
      <section className="my-20 flex flex-col justify-center items-center gap-4 px-4 md:px-0 md:w-5/6 xl:w-4/6 mx-auto">
            <h1 className="text-3xl font-light pb-4 border-b-2 border-pink-200">
              Your Orders
            </h1>
            <OrderCard src="/user/orders/" />
      </section>
    </Layout>
  );
}
