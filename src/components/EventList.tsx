"use client";

import { Category, Event } from "@/utils/customTypes";
import { getCategories, getEvents } from "@/utils/eventApiCalls";
import { useEffect, useState } from "react";
import EventsCard from "./EventsCard";
import IsLoading from "./IsLoading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function EventsList() {
  const [eventsList, setEventsList] = useState<Event[] | []>([]);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const pathname = usePathname();
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = searchParams.get('category')
  
  const handleCatSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === "all") {
      router.push("/events")
      
    } else {
      router.push(`events?category=${selectedValue}`) // Convert to number
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await getEvents(params);
        const categoryData = await getCategories();
        setEventsList(eventData.events);
        setCategories(categoryData.categories);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [params]);

  return (
    <section className="flex flex-col gap-8 max-w-screen-lg mx-auto my-20">
      <h2 className="font-bold text-3xl">Current Events</h2>
      {pathname.includes("events") ? (
        <div className="w-full flex gap-8 items-center">
          <p className="font-bold">Filter events by category:</p>
          <form id="catSelect">
            <select
              name="category"
              id="categories"
              form="catSelect"
              className="p-2 text-sm"
              onChange={handleCatSelect}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
              <option value="all">All</option>
            </select>
          </form>
        </div>
      ) : null}
      {loading ? (
        <IsLoading loading={loading} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsList.map((event: Event) => (
            <EventsCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
