"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LogUserOut } from "@/utils/logUserOut";
import { useAuth } from "./UserContext";

export default function NavBar() {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const { basket, setToken, setUser, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  function handleMenuOpen(): void {
    setNavOpen(!navOpen);
  }

  function handleLogOut(): void {
    LogUserOut({ setToken, setUser });
    setNavOpen(!navOpen);
    router.push("/user/login");
  }

  return (
    <nav className="z-20 flex gap-4">
      <>
        <section className="flex flex-row justify-between px-4 xl:p-0 start-0 items-center w-[100%] max-w-screen-xl mx-auto">
          <button onClick={handleMenuOpen}>
            <svg
              className={`${navOpen ? "mt-[-10px] h-8" : "h-8"}`}
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                className={`${
                  navOpen
                    ? "rotate-45 origin-left transition-all duration-500"
                    : "transition-all duration-500"
                }`}
                strokeLinejoin="round"
                d="M3.75 6.75h16.5"
              />
              <path
                strokeLinecap="round"
                className={`${
                  navOpen
                    ? "-rotate-45 origin-right transition-all duration-500"
                    : "transition-all duration-500"
                }`}
                strokeLinejoin="round"
                d="M3.75 6.75h16.5"
              />
              <path
                strokeLinecap="round"
                className={`${
                  navOpen
                    ? "opacity-0 transition-all duration-500"
                    : "transition-all duration-500 opacity-100"
                }`}
                strokeLinejoin="round"
                d="M3.75 12h16.5"
              />
              <path
                strokeLinecap="round"
                className={`${
                  navOpen
                    ? "opacity-0 transition-all duration-500"
                    : "opactiy-100 transition-all duration-500"
                }`}
                strokeLinejoin="round"
                d="M3.75 17.25h16.5"
              />
            </svg>
          </button>
        </section>
        <div
          onClick={handleMenuOpen}
          className={`${
            !navOpen ? "invisible opacity-0" : "opacity-50"
          } w-full h-[100vh] top-0 left-0 bg-gray-300 fixed duration-500 ease-out transition-all cursor-pointer z-20`}
        ></div>
        <section
          className={`${
            !navOpen ? "translate-x-[-100%]" : "translate-x-0"
          } w-[60vw] sm:w-[30vw] h-[100vh] bg-white left-0 top-0 opacity-100 fixed duration-500 ease-out transition-all p-8 flex flex-col gap-12 justify-center items-center text-left items-start z-40 shadow-lg`}
        >
          <Link href="/">
            <Image
              src="/hobby-verse.svg"
              alt="Hobby Verse Logo"
              className="w-40 h-20"
              width={100}
              height={50}
              priority
              style={{ height: "auto" }}
            />
          </Link>

          <ul className="text-left">
            <p className="text-xs uppercase font-light mt-8 text-gray-500">
              Explore
            </p>
            <Link href="/events">
              <li
                onClick={handleMenuOpen}
                className={`${
                  pathname.includes("/events") ? "text-pink-500" : "text-auto"
                } list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all`}
              >
                Events
              </li>
            </Link>
            <Link href="/about">
              <li
                onClick={handleMenuOpen}
                className={`${
                  pathname.includes("/about") ? "text-pink-500" : "text-auto"
                } list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all`}
              >
                About
              </li>
            </Link>

            <>
              {user ? (
                <>
                  <p className="text-xs uppercase font-light mt-8 text-gray-500">
                    Your stuff
                  </p>
                  <Link href="/user/profile">
                    <li
                      onClick={handleMenuOpen}
                      className={`${
                        pathname.includes("/profile")
                          ? "text-pink-500"
                          : "text-auto"
                      } list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all`}
                    >
                      Profile
                    </li>
                  </Link>
                  <Link href="/user/orders">
                    <li
                      onClick={handleMenuOpen}
                      className={`${
                        pathname.includes("/user/orders")
                          ? "text-pink-500"
                          : "text-auto"
                      } list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all`}
                    >
                      Your orders
                    </li>
                  </Link>
                  {basket ? (
                    <Link href="/basket">
                      <li
                        onClick={handleMenuOpen}
                        className={`${
                          pathname.includes("/basket")
                            ? "text-pink-500"
                            : "text-auto"
                        } list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all`}
                      >
                        Basket
                      </li>
                    </Link>
                  ) : null}
                </>
              ) : null}

              {user ? (
                user.role !== "customer" ? (
                  <>
                    <p className="text-xs uppercase font-light mt-8 text-gray-500">
                      Admin
                    </p>
                    <Link href="/admin/draft-events">
                      <li
                        onClick={handleMenuOpen}
                        className={`${
                          pathname.includes("/admin/draft-events")
                            ? "text-pink-500"
                            : "text-auto"
                        } list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all`}
                      >
                        Draft Events
                      </li>
                    </Link>
                    <Link href="/admin/orders">
                      <li
                        onClick={handleMenuOpen}
                        className={`${
                          pathname.includes("/admin/orders")
                            ? "text-pink-500"
                            : "text-auto"
                        } list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all`}
                      >
                        Orders
                      </li>
                    </Link>
                    <Link href="/admin/users">
                      <li
                        onClick={handleMenuOpen}
                        className={`${
                          pathname.includes("/admin/users")
                            ? "text-pink-500"
                            : "text-auto"
                        } list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all`}
                      >
                        Users
                      </li>
                    </Link>
                    <Link href="/admin/tickets">
                      <li
                        onClick={handleMenuOpen}
                        className={`${
                          pathname.includes("/admin/tickets")
                            ? "text-pink-500"
                            : "text-auto"
                        } list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all`}
                      >
                        Tickets
                      </li>
                    </Link>
                    <Link href="/admin/categories">
                      <li
                        onClick={handleMenuOpen}
                        className={`${
                          pathname.includes("/admin/categories")
                            ? "text-pink-500"
                            : "text-auto"
                        } list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all`}
                      >
                        Categories
                      </li>
                    </Link>
                  </>
                ) : null
              ) : null}
              {user ? (
                <>
                  <p className="text-xs uppercase font-light mt-8 text-gray-500">
                    Goodbye
                  </p>
                  <li
                    onClick={handleLogOut}
                    className="list-style-none font-bold text-lg mb-4 flex gap-4 justify-start items-center cursor-pointer hover:text-gray-400 duration-500 ease-out transition-all"
                  >
                    Logout
                  </li>
                </>
              ) : null}
            </>
          </ul>
        </section>

        <div
          onClick={handleMenuOpen}
          className={`${
            !navOpen ? "invisible opacity-0" : "opacity-100"
          } fixed cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center left-0 mt-5 ml-5 z-50 transition-all duration-1000`}
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </>
    </nav>
  );
}
