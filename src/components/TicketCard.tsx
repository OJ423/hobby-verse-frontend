import { EventTickets } from "@/utils/customTypes";
import { useState } from "react";

interface TicketCardProps {
  ticket: EventTickets;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [ticketQty, setTicketQty] = useState<number>(0);
  
  const addToOrder = () => {
    setTicketQty((prevQty) => prevQty + 1);
  };

  const removeFromOrder = () => {
    if (ticketQty === 0) {}
    else {
      setTicketQty((prevQty) => prevQty -1 )
    }
  }

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
          <div className="col-span-1 flex items-center justify-end gap-2">
            <p onClick={addToOrder} className="p-2 bg-white border-2 border-gray-900 rounded transition-all duration-500 hover:border-pink-500 cursor-pointer">
              +
            </p>
            <p className="p-2 bg-white border-2 border-gray-900 rounded w-10 text-center">
              {ticketQty}
            </p>
            <p onClick={removeFromOrder} className="p-2 bg-white border-2 border-gray-900 rounded transition-all duration-500 hover:border-pink-500 cursor-pointer">
              -
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TicketCard;
