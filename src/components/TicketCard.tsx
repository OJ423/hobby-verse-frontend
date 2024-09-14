"use client";

import { Event, EventTickets } from "@/utils/customTypes";
import BasketChange from "./BasketChange";
import { useEffect, useState } from "react";
import StyledButton from "./StyledButton";
import axios from "axios";
import { useAuth } from "./UserContext";
import { deleteEventTicket } from "@/utils/ticketApiCalls";
import EventTicketsEdit from "./EventTicketsEdit";

interface TicketCardProps {
  ticket: EventTickets;
  event: Event;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, event }) => {
  const [adminCheck, setAdminCheck] = useState<boolean>(false);
  const [deleteCheck, setDeleteCheck] = useState<boolean>(false);
  const { setUser, setToken } = useAuth();
  const [apiErr, setApiErr] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const handleDeleteCheck = () => {
    setDeleteCheck(!deleteCheck);
  };

  const handleEditEventTicket = () => {
    setShowEdit(!showEdit);
  };

  const handleDelete = async () => {
    try {
      if (event) {
        const localToken = localStorage.getItem("token");
        const data = await deleteEventTicket(localToken, ticket.id);
        setToken(data.token);
        localStorage.setItem("token", data.token);
      }
    } catch (err) {
      console.log("Something went wrong", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setApiErr(
            "Your login token has expired. Please login to refresh your token to complete this action."
          );
          setUser(null);
          localStorage.removeItem("user");
          setToken(null);
          localStorage.removeItem("token");
        }
      } else {
        setApiErr("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const user = JSON.parse(localUser);
      if (user.role === "admin" || user.role === "staff") setAdminCheck(true);
    }
  }, []);

  return (
    <>
      <section className="mb-8 flex gap-4 items-center justify-between pb-4 border-b-2 border-pink-200">
        <div className="grid grid-cols-4 gap-4 justify-center my-8 w-full">
          <div className="flex flex-col justify-center col-span-2">
            <h2 className="font-bold text-lg">{ticket.name}</h2>
            <p className="text-sm">{ticket.description}</p>
            <p className="text-xs text-gray-500">
              {" "}
              {`This ticket is for ${
                ticket.ticket_head_count > 1
                  ? `${ticket.ticket_head_count} people`
                  : `${ticket.ticket_head_count} person`
              }`}
            </p>
            <p className="text-pink-500 font-bold text-sm mt-2">
              {ticket.quantity} tickets left
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-bold">Price:</p>
            {ticket.is_free ? (
              <p className="text-xl font-light">FREE</p>
            ) : ticket.price === null ? (
              <p className="text-xl font-light">Donate a value</p>
            ) : (
              <p className="text-xl font-light">{ticket.price}</p>
            )}
          </div>
          <BasketChange ticket={ticket} event={event} />
        </div>
      </section>
      {adminCheck ? (
        <section className="flex gap-4 items-center -m-8 mb-4">
          <>
            <p className="text-xs font-bold text-gray-600">Admin Zone:</p>
            {showEdit ? (
              <EventTicketsEdit setApiErr={setApiErr} ticket={ticket} showEdit={showEdit} setShowEdit={setShowEdit} />
            ) : (
              <>
                <button
                  onClick={handleEditEventTicket}
                  className="border-solid border-4 border-black py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out text-xs"
                >
                  Change Quantity
                </button>
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
              </>
            )}
          </>
          {apiErr ? <p className="text-red-500 font-bold">{apiErr}</p> : null}
        </section>
      ) : null}
    </>
  );
};

export default TicketCard;
