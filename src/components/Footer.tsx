"use client";

import { MdEvent } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "./UserContext";
import { useEffect, useState } from "react";
import { Category } from "@/utils/customTypes";
import { getCategories } from "@/utils/eventApiCalls";
import { LogUserOut } from "@/utils/logUserOut";
import { useRouter } from "next/navigation";

export default function Footer() {
  const { user, setUser, setToken } = useAuth();
  const [categories, setCategories] = useState<Category[] | []>([]);
  const router = useRouter();

  function handleLogOut(): void {
    LogUserOut({ setToken, setUser });
    router.push("/user/login");
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getCategories();
        setCategories(data.categories);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  },[]);

  return (
    <footer className="w-screen pt-20 bg-gray-200 flex flex-col items-center justify-start">
      <section className="box-sizing grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 px-8 md:px-24 items-start">
        <div>
          <h2 className="font-bold text-2xl mb-4">Hobby Verse</h2>
          <p className="font-light">Feeding your creativity.</p>
        </div>
        <div className="grid gap-4">
          <Link href="/events">
            <div className="flex flex gap-4 items-center hover:opacity-50 cursor-pointer transition duration-500">
              <MdEvent size={25} />
              <p className="text-xs font-light">Events</p>
            </div>
          </Link>
          {categories
            ? categories.map((category) => (
                <Link key={category.id} href="/events">
                  <div className="flex gap-4 items-center hover:opacity-50 cursor-pointer transition duration-500">
                    <MdEvent size={25} />
                    <p className="text-xs font-light">{category.name}</p>
                  </div>
                </Link>
              ))
            : null}
        </div>
        <div>
          {user ? (
            <>
              <h2 className="font-bold text-xl pb-4">Hey {user.name}</h2>
              <div>
                <Link href={"/user/profile"}>
                  <p className="font-medium hover:opacity-50 cursor-pointer transition-all duration-500 pb-4">
                    Profile
                  </p>
                </Link>
                <Link href={"/user/orders"}>
                  <p className="font-medium hover:opacity-50 cursor-pointer transition-all duration-500 pb-4">
                    Your orders
                  </p>
                </Link>
                <p
                  onClick={handleLogOut}
                  className="font-medium hover:opacity-50 cursor-pointer transition-all duration-500 pb-4"
                >
                  Logout
                </p>
              </div>
            </>
          ) : (
            <Link href="/user/login">
              <p className="font-medium hover:opacity-50 cursor-pointer transition-all duration-500 text-center">
                Login / Register
              </p>
            </Link>
          )}
        </div>
        <div>
          <Link href="/">
            <Image
              src="/hobby-verse.svg"
              alt="Commyounity Logo"
              className="w-40 md:w-60"
              width={250}
              height={12}
              priority
              style={{ height: "auto" }}
            />
          </Link>
        </div>
      </section>
      <section className="mt-20 py-8 bg-gray-300 flex items-center justify-center w-[100%] box-sizing">
        <p className="font-bold text-sm">© 2024 Copyright: Commyounity</p>
      </section>
    </footer>
  );
}
