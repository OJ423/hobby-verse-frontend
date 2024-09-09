"use client";

import Image from "next/image";
import Link from "next/link";
import NavBar from "./Navbar";
// import { useAuth } from './context/AuthContext'

export default function Header() {
  // const { selectedCommunity, user } = useAuth()

  return (
    <header className="w-[100%] box-sizing p-4 bg-white shadow-lg">
      <section className="flex flex-row justify-between max-w-screen-xl mx-auto items-center gap-2">
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
        <div className="flex gap-2 md:gap-4 items-center">
          <Link
            className="w-8 h-8 bg-pink-500 p-2 border-4 border-black rounded-full flex items-center justify-center hover:opacity-50 transition-all duration-500"
            href="/user/profile"
          >
            <p className="font-black">O</p>
          </Link>
          <NavBar />
        </div>
      </section>
    </header>
  );
}
