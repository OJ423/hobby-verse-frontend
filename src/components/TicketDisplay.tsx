import { EventTickets } from "@/utils/customTypes";
import { getEventTickets } from "@/utils/ticketApiCalls";
import { useEffect, useState } from "react";
import IsLoading from "./IsLoading";
import TicketCard from "./TicketCard";
import { IoTicketOutline } from "react-icons/io5";


interface EventTicketProps {
  eventId: string;
  eventName: string;
}

const TicketDisplay: React.FC<EventTicketProps> = ({ eventId, eventName }) => {
  const [eventTickets, setEventTickets] = useState<EventTickets[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventTicketsData = await getEventTickets(eventId);
        setEventTickets(eventTicketsData.eventTickets);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <>
      {loading ? (
        <IsLoading loading={loading} />
      ) : eventTickets.length ? (
        <section className="flex flex-col gap-4 my-8 w-full md:w-9/12 lg:w-2/3">
          <div className="flex items-center gap-4 border-b-2 border-pink-500 pb-8">
            <IoTicketOutline size={42} className="text-pink-500"/>
            <h1 className="text-3xl font-light">Tickets for {eventName}</h1>

          </div>
            {eventTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </section>
      ) : <p className="my-20">{`We're sorry but this appears to be sold out.`}</p>}
    </>
  );
};

export default TicketDisplay;
