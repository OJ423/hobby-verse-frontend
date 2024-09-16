import EventsList from "@/components/EventList";
import IsLoading from "@/components/IsLoading";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Layout>
        <section className="mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-screen-xl">
          <div className="md:w-full mx-auto">
            <h1 className="font-bold text-3xl lg:text-5xl mb-8">
              Welcome to the Hobby Verse
            </h1>
            <p className="font-medium text-lg">
              Hobby Verse is brought to you by Altrincham Art&apos;s council and
              is a place for those who are interested in a variety of creative
              projects. From photography to cooking, we aim to provide a range
              of free and paid for events to feed your creative side.
            </p>
            <div className="flex gap-4">
              <Link
                href="/user/login"
                className="border-solid border-4 border-black py-3 px-6 inline-block rounded-xl mt-8 uppercase font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out"
              >
                <span>Sign up</span>
              </Link>
              <Link
                href="/events"
                className="border-solid border-4 border-black py-3 px-6 inline-block rounded-xl mt-8 uppercase font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out"
              >
                <span>Events</span>
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end md:pl-8 xl:pl-20">
            <Image
              src="/welcome-to-the-hobby-verse.png"
              width={500}
              height={500}
              quality={100}
              className="w-full"
              alt="Hobby Verse - Book onto events and feed your interests."
            />
          </div>
        </section>
        <Suspense fallback={<IsLoading loading={true} />}>
          <EventsList status="property" />
        </Suspense>
      </Layout>
    </>
  );
}
