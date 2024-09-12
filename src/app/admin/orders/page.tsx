"use client";

import Layout from "@/components/Layout";
import OrderCard from "@/components/OrderCard";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [adminCheck, setAdminCheck] = useState<boolean>(false)
  
  useEffect(() => {
    const localUser = localStorage.getItem("user")
    if (localUser) {
      const user = JSON.parse(localUser);
      if (user.role === "admin" || user.role === "staff"){
        setAdminCheck(true)
      }
    }
  },[])
 
  return (
    <Layout>
      <section className="my-20 flex flex-col justify-center items-center gap-4 px-4 md:px-0 md:w-5/6 xl:w-4/6 mx-auto">
        <h1 className="text-3xl font-light pb-4 border-b-2 border-pink-200">
          All Orders
        </h1>
        {adminCheck ?
        <OrderCard src="/admin/orders/" />
        : <p>{`Hmmm...something doesn't seem quite right.`}</p>
        }
      </section>
    </Layout>
  );
}
