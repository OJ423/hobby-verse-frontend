"use client";

import Image from "next/image";
import Link from "next/link";
import NavBar from "./Navbar";
import { useAuth } from "./UserContext";
import { FaShoppingBasket } from "react-icons/fa";
import { MdEvent, MdLogin } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, basket } = useAuth();
  const pathname = usePathname();

  return (
    <header className="w-[100%] box-sizing p-4 bg-white shadow-lg">
      <section className="flex flex-row justify-between max-w-screen-xl mx-auto items-center gap-8">
        <Link className="max-w-[50%]" href="/">
          <Image
            src="/hobby-verse.svg"
            alt="Hobby Verse Logo"
            className="w-20 h-10 md:w-30 md:h-15"
            width={100}
            height={50}
            priority
            style={{ height: "auto" }}
          />
        </Link>
        <div className="flex gap-8 items-center">
          <section className="flex gap-8 items-center justify-end">
            <Link
              href="/events"
              className={`${
                pathname.includes("/events") ? "text-pink-500" : "text-auto"
              } flex gap-2 hover:text-gray-400 transition-all duration-500 ease-out items-center`}
            >
              <MdEvent size={25} aria-label="View events" />
              <li className="list-style-none hidden sm:block font-bold text-xs md:text-lg flex gap-4 justify-start items-center cursor-pointer">
                Events
              </li>
            </Link>
            {user ? null : (
              <Link
                href="/user/login"
                className={`${
                  pathname.includes("/login") ? "text-pink-500" : "text-auto"
                } flex gap-2 hover:text-gray-400 transition-all duration-500 ease-out items-center`}
              >
                <MdLogin size={25} aria-label="View active communities" />
                <li className="list-style-none hidden sm:block font-bold text-xs md:text-lg flex gap-4 justify-start items-center cursor-pointer">
                  Login/Register
                </li>
              </Link>
            )}
          </section>
          {basket ? (
            <Link href="/basket">
              <FaShoppingBasket
                size={24}
                aria-label="Shopping basket"
                className="transition-all duration-500 hover:opacity-50"
              />
            </Link>
          ) : null}
          {user ? (
            <Link
              className="w-8 h-8 bg-pink-500 p-2 border-4 border-black rounded-full flex items-center justify-center hover:opacity-50 transition-all duration-500"
              aria-label="Profile page"
              href="/user/profile"
            >
              <p className="font-black">{user.name.charAt(0).toUpperCase()}</p>
            </Link>
          ) : null}
          <NavBar />
        </div>
      </section>
    </header>
  );
}
