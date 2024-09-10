"use client"

import { Basket, Event, EventTickets } from "@/utils/customTypes";
import { useEffect, useState } from "react";
import { useAuth } from "./UserContext";
import BasketChange from "./BasketChange";

interface TicketCardProps {
  ticket: EventTickets;
  event: Event;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, event }) => {
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
    </>
  );
};

export default TicketCard;
