"use client";

import { Event } from "@/utils/customTypes";
import { dateConverter } from "@/utils/dateConverter";
import Image from "next/image";
import Link from "next/link";
import {
  IoPeopleOutline,
} from "react-icons/io5";

type ListProps = {
  event: Event;
};

const EventsCard: React.FC<ListProps> = ({ event }) => {

  const formattedDate = dateConverter(event.date)

  return (
    <section className="rounded bg-gray-200 shadow-lg">
      {event.img ?
      <Image
      src={event.img}
      width={200}
      height={100}
      quality={60}
      priority
      alt={`${event.name}`}
      className="w-full h-60 object-cover rounded-t mb-4"
    />
      :
      <Image
      src="/event-placeholder-img.webp"
      width={200}
      height={100}
      quality={60}
      priority
      alt={`${event.name}`}
      className="w-full h-60 object-cover rounded-t mb-4"
      />
      }

      <h3 className="font-semibold px-2 text-lg pb-4">
        {event.name}
      </h3>
      <p className="px-2">{event.description}</p>
      <div className="flex gap-4 items-center justify-between px-2 pb-2">
        <div className="flex gap-2 justify-center">
          <IoPeopleOutline size={25} />
          <p className="font-bold">{event.capacity} x Capacity</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={{
              pathname: `/events/${event.id}`,
            }}
            className="border-solid border-4 border-black py-2 px-3 inline-block rounded-xl uppercase font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out"
          >
            <span>View</span>
          </Link>
        </div>
      </div>
      <div className="p2 mt-4 bg-pink-500 text-white rounded-b">
        <p className="text-sm font-bold text-center">{formattedDate}</p>
      </div>
    </section>
  );
};

export default EventsCard;