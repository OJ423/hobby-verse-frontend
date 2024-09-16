import { EventTicketInput, EventTickets } from "@/utils/customTypes";
import { patchEventTicket } from "@/utils/ticketApiCalls";
import { useEffect, useState } from "react";
import { useAuth } from "./UserContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { handleApiError } from "@/utils/apiErrors";
import IsLoading from "./IsLoading";

interface EventTicketsEditProps {
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  showEdit: boolean;
  ticket: EventTickets;
}

const EventTicketsEdit: React.FC<EventTicketsEditProps> = ({
  setApiErr,
  ticket,
  setShowEdit,
  showEdit,
}) => {
  const { setToken, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  // Form

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventTicketInput>();

  const onSubmit: SubmitHandler<EventTicketInput> = async (data) => {
    try {
      setLoading(true)
      const localToken = localStorage.getItem("token");
      const eventData = await patchEventTicket(localToken, ticket.id, data);
      localStorage.setItem("token", eventData.token);
      setToken(eventData.token);
      setLoading(false)
      setShowEdit(!showEdit);
    } catch (err) {
      handleApiError({
        err,
        setApiErr,
        setLoading,
        setUser,
        setToken,
      });
    }
  };

  useEffect(() => {
    // set values of form

    setValue("ticket_id", ticket.ticket_id);
    setValue("event_id", ticket.event_id);
    setValue("quantity", ticket.quantity);
  }, [
    setApiErr,
    setToken,
    setUser,
    setValue,
    ticket.quantity,
    ticket.ticket_id,
    ticket.event_id,
  ]);

  return (
    <>
      {loading ? (
        <IsLoading loading={loading} />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex items-center gap-5"
        >
          <label className="text-xs text-gray-400 py-4" htmlFor="name">
            QTY:
          </label>
          <input
            className="p-4  rounded border-2 border-pink-200 w-20 text-center"
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
            className="border-solid border-4 border-black py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out text-xs"
            type="submit"
            value="Submit"
          />
        </form>
      )}
    </>
  );
};

export default EventTicketsEdit;
