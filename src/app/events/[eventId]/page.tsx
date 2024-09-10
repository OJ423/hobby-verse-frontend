"use client";

import IsLoading from "@/components/IsLoading";
import Layout from "@/components/Layout";
import TicketDisplay from "@/components/TicketDisplay";
import { Event } from "@/utils/customTypes";
import { dateConverter } from "@/utils/dateConverter";
import { getEvent } from "@/utils/eventApiCalls";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineEmojiPeople, MdOutlineMap } from "react-icons/md";

export default function SingleEvent() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>("TBD");

  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await getEvent(eventId);
        const formattedDate = dateConverter(eventData.event.date);
        setDate(formattedDate);
        setEvent(eventData.event);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <>
      <Layout>
        {loading ? (
          <section className="w-full my-96">
            <IsLoading loading={loading} />
          </section>
        ) : event ? (
          <>
            <section className="my-4 w-full pt-4 md:px-0 md:w-9/12 lg:w-2/3">
              <Link  
                href="/events"
                className="text-xs text-pink-500 font-bold transition-all duration-500 hover:text-gray-900">
              {`< Back to events`}
              </Link>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center  mt-4 w-full px-4 md:px-0 md:w-9/12 lg:w-2/3 mb-8">
              <div className="w-full h-full md:px-8">
                {event ? (
                  event.img ? (
                    <Image
                      src={event.img}
                      width={550}
                      height={550}
                      quality={100}
                      priority
                      alt={`${event.name}`}
                      className="w-full h-full p-4 object-cover rounded-t mb-4"
                    />
                  ) : (
                    <Image
                      src="/event-placeholder-img.webp"
                      width={550}
                      height={550}
                      quality={100}
                      priority
                      alt={`${event.name}`}
                      className="w-full h-full p-4 object-cover rounded-t mb-4"
                    />
                  )
                ) : null}
              </div>
              <div className="flex flex-col gap-4 m-4 md:m-8 border-4 border-pink-500 rounded p-4 md:p-8">
                <div className="flex justify-between items-center gap-4 border-b-2 border-pink-200 pb-4 md:pb-8">
                  <p className="py-2 px-4 bg-pink-500 text-white font-bold text-sm rounded">
                    {date}
                  </p>
                  <p className="text-xs font-semibold p-2 bg-gray-200 rounded border-2 border-gray-400">
                    {event.category_name}
                  </p>
                </div>
                <h1 className="text-2xl leading-2">{event.name}</h1>
                <p>{event.description}</p>
                <div className="flex gap-4 items-center">
                  <MdOutlineEmojiPeople size={25} />
                  <p className="text-xs font-bold">
                    Room for a total of {event.capacity} people
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  {event.location ? (
                    <>
                      <MdOutlineMap size={25} />
                      <p className="text-xs font-bold">
                        Location: {event.location}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </section>
            <TicketDisplay eventId={eventId} eventName={event?.name} event={event} />
          </>
        ) : (
          <p>Something went wrong. Please try and refresh the page.</p>
        )}
      </Layout>
    </>
  );
}
