"use client";

import { Category, Event, UnsplashImage } from "@/utils/customTypes";
import { getCategories, getEvents } from "@/utils/eventApiCalls";
import { useEffect, useState } from "react";
import EventsCard from "./EventsCard";
import IsLoading from "./IsLoading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FormDrawer from "./FormDrawer";
import ImageSearch from "./ImageSearch";
import EventAddForm from "./EventAddForm";
import { handleApiError } from "@/utils/apiErrors";
import { useAuth } from "./UserContext";

interface EventsListProps {
  status: string;
}

const EventsList: React.FC<EventsListProps> = ({ status }) => {
  const [eventsList, setEventsList] = useState<Event[] | []>([]);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [adminCheck, setAdminCheck] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [apiErr, setApiErr] = useState<string | null>(null);
  const {setUser, setToken} = useAuth()

  // Image Select
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState<UnsplashImage[] | []>([]);
  const [imageConfirm, setImageConfirm] = useState<string>("");

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImages([]);
    setImageConfirm("Event image selected");
  };

  // Show Edit Form
  const handleDisplayForm = () => {
    setShowForm(!showForm);
    setImageConfirm("");
  };

  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = searchParams.get("category");

  const handleCatSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === "all") {
      router.push("/events");
    } else {
      router.push(`events?category=${selectedValue}`); // Convert to number
    }
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const user = JSON.parse(localUser);
      if (user.role === "admin" || user.role === "staff") {
        setAdminCheck(true);
      }
    }

    const fetchData = async () => {
      try {
        const eventData = await getEvents(params, status);
        const categoryData = await getCategories();
        setEventsList(eventData.events);
        setCategories(categoryData.categories);
        setLoading(false);
      } catch (err) {
        handleApiError({
          err,
          setApiErr,
          setLoading,
          setUser,
          setToken
        });
      }
    };
    fetchData();
  }, [params, status]);

  return (
    <section className="flex flex-col gap-8 max-w-screen-lg mx-auto my-20">
      {adminCheck ? (
        apiErr ? (
          <p className="font-bold text-red-500">{apiErr}</p>
        ) : null
      ) : null}

      <div className="flex justify-between items-center gap-4">
        <h1 className="font-bold text-3xl">Events</h1>

        {pathname.includes("events") ? (
          adminCheck ? (
            <>
              <button
                onClick={handleDisplayForm}
                className="border-solid border-4 border-black py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out text-xs"
              >
                Add New
              </button>
              <FormDrawer
                showForm={showForm}
                handleDisplayForm={handleDisplayForm}
              >
                <ImageSearch
                  onSelectImage={handleImageSelect}
                  images={images}
                  setImages={setImages}
                  imageConfirm={imageConfirm}
                />
                <EventAddForm
                  showForm={showForm}
                  setShowForm={setShowForm}
                  setApiErr={setApiErr}
                  selectedImage={selectedImage}
                />
              </FormDrawer>
            </>
          ) : null
        ) : null}
      </div>

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
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </form>
      </div>

      {loading ? (
        <IsLoading loading={loading} />
      ) : eventsList.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-stretch items-stretch">
          {eventsList.map((event: Event) => (
            <EventsCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p>There are not events currently. Check again later.</p>
      )}
    </section>
  );
};

export default EventsList;
