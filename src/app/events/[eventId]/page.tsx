"use client";

import EventEditForm from "@/components/EventEditForm";
import EventTicketsAdd from "@/components/EventTicketsAdd";
import FormDrawer from "@/components/FormDrawer";
import ImageSearch from "@/components/ImageSearch";
import IsLoading from "@/components/IsLoading";
import Layout from "@/components/Layout";
import StyledButton from "@/components/StyledButton";
import TicketDisplay from "@/components/TicketDisplay";
import { useAuth } from "@/components/UserContext";
import { handleApiError } from "@/utils/apiErrors";
import { Event, UnsplashImage } from "@/utils/customTypes";
import { dateConverter, dateToTimeConverter } from "@/utils/dateConverter";
import { deleteEvent, getEvent } from "@/utils/eventApiCalls";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineEmojiPeople, MdOutlineMap } from "react-icons/md";


export default function SingleEvent() {
  const { token, setToken, setUser } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [adminCheck, setAdminCheck] = useState<boolean>(false);
  const [deleteCheck, setDeleteCheck] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [apiErr, setApiErr] = useState<string | null>(null);
  const [formType, setFormType] = useState<string>("")

  // Image Select
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState<UnsplashImage[] | []>([]);
  const [imageConfirm, setImageConfirm] = useState<string>("")
  
  const router = useRouter()

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImages([])
    setImageConfirm("Event image selected")
  };

  // Generic Show Form
  const handleDisplayForm = () => {
    setShowForm(!showForm);
    setImageConfirm("")
  };

  // Show Edit Form

  const handleDisplayEditForm = () => {
    setApiErr(null)
    setFormType("edit")
    setShowForm(!showForm);
    setImageConfirm("")
  };

  // Show Add Ticket Form
  const handleDisplayTicketForm = () => {
    setApiErr(null)
    setFormType("ticket")
    setShowForm(!showForm);
    setImageConfirm("")
  };

  const { eventId } = useParams<{ eventId: string }>();

  const handleDeleteCheck = () => {
    setDeleteCheck(!deleteCheck);
  };

  const handleDelete = async () => {
    try {
      if (event) {
        const localToken = localStorage.getItem("token");
        const data = await deleteEvent(localToken, event.id);
        setToken(data.token)
        localStorage.setItem("token", data.token)
        router.back()
      }
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

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const user = JSON.parse(localUser);
      if (user.role === "staff" || user.role === "admin") {
        setAdminCheck(true);
      }
    }
    const fetchData = async () => {
      try {
        const eventData = await getEvent(eventId);
        setEvent(eventData.event);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setApiErr(
          "Something went wrong fetching the data, please try and refresh the page"
        );
      }
    };

    fetchData();
  }, [eventId, token]);
  
  return (
    <>
      <Layout>
        {loading ? (
          <section className="w-full my-96">
            <IsLoading loading={loading} />
          </section>
        ) : event ? (
          <>
            <section className="my-4 w-full pt-4 px-4 max-w-screen-lg">
              <Link
                href="/events"
                className="text-xs text-pink-500 font-bold transition-all duration-500 hover:text-gray-900"
              >
                {`< Back to events`}
              </Link>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center  mt-4 w-full px-4 max-w-screen-lg mb-8">
              <div className="w-full h-full">
                {event ? (
                  event.img ? (
                    <Image
                      src={event.img}
                      width={550}
                      height={550}
                      quality={100}
                      priority
                      alt={`${event.name}`}
                      className="w-full h-full object-cover rounded mb-4"
                    />
                  ) : (
                    <Image
                      src="/event-placeholder-img.webp"
                      width={550}
                      height={550}
                      quality={100}
                      priority
                      alt={`${event.name}`}
                      className="w-full h-full object-cover rounded mb-4"
                    />
                  )
                ) : null}
              </div>
              <div>
                <div className="flex flex-col gap-4 mb-4 border-4 border-pink-500 rounded p-4 md:p-8">
                  <div className="flex justify-between items-center gap-4 border-b-2 border-pink-200 pb-4 md:pb-8">
                    <p className="py-2 px-4 bg-pink-500 text-white font-bold text-sm rounded">
                      {dateConverter(event.date)} - {dateToTimeConverter(event.end_date)}
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
                {adminCheck ? (
                  <div>
                  <div className="flex items-center flex-wrap justify-center gap-4">
                    <p className="text-xs font-bold text-gray-600">
                      Admin Zone:
                    </p>
                    <div onClick={handleDisplayTicketForm}>
                      <StyledButton src="" linkText="Add Tickets" />
                    </div>
                    <div onClick={handleDisplayEditForm}>
                      <StyledButton src="" linkText="Edit" />
                    </div>
                    <FormDrawer
                      showForm={showForm}
                      handleDisplayForm={handleDisplayForm}
                    >
                      {formType === "edit" ?
                      <>
                      <ImageSearch
                        onSelectImage={handleImageSelect}
                        images={images}
                        setImages={setImages}
                        imageConfirm={imageConfirm}
                      />
                      <EventEditForm
                        showForm={showForm}
                        setShowForm={setShowForm}
                        event={event}
                        setApiErr={setApiErr}
                        selectedImage={selectedImage}
                      />
                      </>
                      : 
                      <EventTicketsAdd
                        showForm={showForm}
                        setShowForm={setShowForm}
                        event={event}
                        setApiErr={setApiErr}
                        apiErr={apiErr}
                      />
                      }
                    </FormDrawer>
                    {!deleteCheck ? (
                      <button
                        onClick={handleDeleteCheck}
                        className="border-solid border-4 border-red-500 text-red-500 py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-500 ease-out text-xs"
                      >
                        Delete
                      </button>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={handleDelete}
                            className="border-solid border-4 border-red-500 text-red-500 py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-500 ease-out text-xs"
                          >
                            Confirm
                          </button>
                          <div onClick={handleDeleteCheck}>
                            <StyledButton src="" linkText="Cancel" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                    {apiErr ? (
                      <p className="text-red-500 font-bold mt-4">{apiErr}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </section>
            <TicketDisplay
              eventId={eventId}
              eventName={event?.name}
              event={event}
            />
          </>
        ) : (
          <p>Something went wrong. Please try and refresh the page.</p>
        )}
      </Layout>
    </>
  );
}
