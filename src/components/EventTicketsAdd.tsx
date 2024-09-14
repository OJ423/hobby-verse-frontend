import { Event, EventTicketInput, Ticket } from "@/utils/customTypes";
import { getAllTickets, postEventTicket } from "@/utils/ticketApiCalls";
import { useEffect, useState } from "react";
import { useAuth } from "./UserContext";
import axios from "axios";
import { RiMoneyPoundBoxLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import StyledButton from "./StyledButton";
import { useForm, SubmitHandler } from "react-hook-form";

interface EventTicketsAddProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  apiErr: string | null;
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>;
  event: Event;
}

const EventTicketsAdd: React.FC<EventTicketsAddProps> = ({
  showForm,
  setShowForm,
  apiErr,
  setApiErr,
  event,
}) => {
  const [tickets, setTickets] = useState<Ticket[] | []>([]);
  const { setToken, setUser } = useAuth();

  // Ticket Selection

  const [chosenTicket, setChosenTicket] = useState<Ticket | null>(null);

  const handleSelectTicket = (ticket: Ticket) => {
    setChosenTicket(ticket);
  };

  const handleCancelTicketSelect = () => {
    setChosenTicket(null);
  };

  // Form

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState,
    formState: { errors },
  } = useForm<EventTicketInput>();

  const onSubmit: SubmitHandler<EventTicketInput> = async (data) => {
    try {
      const localToken = localStorage.getItem("token");
      const eventData = await postEventTicket(localToken, data);
      localStorage.setItem("token", eventData.token);
      setToken(eventData.token);
      setShowForm(!showForm);
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
        if (err.response?.data.msg.length) {
          setApiErr(err.response.data.msg);
        }
      } else {
        setApiErr("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Get Tickets

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const localToken = localStorage.getItem("token");
        const data = await getAllTickets(localToken);
        setTickets(data.tickets);
        localStorage.setItem("token", data.token);
        setToken(data.token);
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
    fetchTickets();

    // set values of form
    if (chosenTicket) {
      setValue("ticket_id", chosenTicket.id);
      setValue("event_id", event.id);
      setValue("quantity", 1);
    }

    // Reset Form
    if (formState.isSubmitSuccessful) {
      reset({ quantity: 1 });
      setChosenTicket(null);
    }
  }, [
    setApiErr,
    setToken,
    setUser,
    chosenTicket,
    setValue,
    event.id,
    formState.isSubmitSuccessful,
    reset,
  ]);

  return (
    <>
      <h2 className="text-lg font-bold">Choose a ticket</h2>
      {chosenTicket ? (
        <>
          <p className="font-bold text-green-500">
            {chosenTicket.name} selected
          </p>
          <div onClick={handleCancelTicketSelect}>
            <StyledButton src="" linkText="Cancel Selection" />
          </div>
        </>
      ) : (
        <>
          {tickets.map((ticket) => (
            <section
              key={ticket.id}
              onClick={() => handleSelectTicket(ticket)}
              className="w-full flex-col gap-2 cursor-pointer border-2 border-pink-200 rounded p-4 hover:bg-pink-200 transition-all duration-500"
            >
              <p className="font-bold">{ticket.name}</p>
              <p className="mb-4 text-xs text-gray-500">{ticket.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex gap-2 items-center">
                  <RiMoneyPoundBoxLine size={24} />
                  {ticket.is_free ? (
                    <p className="text-sm">{ticket.price}</p>
                  ) : ticket.price ? (
                    <p className="text-sm">{ticket.price}</p>
                  ) : (
                    <p className="text-sm">Pay What You Feel</p>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <IoPeopleOutline size={24} />
                  <p className="text-sm">{ticket.qty_tickets}</p>
                </div>
              </div>
            </section>
          ))}
        </>
      )}
      <p className="text-red-500 font-bold">{apiErr}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="text-xs text-gray-400 py-4" htmlFor="name">
          Ticket Quantity
        </label>
        <input
          className="p-4  rounded border-2 border-pink-200"
          {...register("quantity", {
            required: "Must be a number and more than 0",
            valueAsNumber: true,
          })}
          id="quantity"
          name="quantity"
        />
        {errors.quantity && (
          <span className="text-rose-600 text-xs font-bold">
            Ticket quantity is required and must be a number
          </span>
        )}
        <input
          hidden
          className="p-4 rounded border-2 border-pink-200"
          {...register("ticket_id")}
          id="ticket_id"
          name="ticket_id"
        />

        <input
          hidden
          type="datetime-local"
          className="p-4 rounded border-2 border-pink-200"
          {...register("event_id")}
          id="event_id"
          name="event_id"
        />

        <input
          className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-pink-500 hover:text-white border-2 border-pink-500 hover:bg-pink-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-pink-500 duration-300 mt-8"
          type="submit" value="Submit"
        />
      </form>
    </>
  );
};

export default EventTicketsAdd;
