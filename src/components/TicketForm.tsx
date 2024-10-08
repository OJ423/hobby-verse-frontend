import { Ticket, TicketInput } from "@/utils/customTypes";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "./UserContext";
import { useEffect, useState } from "react";
import { patchTicket } from "@/utils/ticketApiCalls";
import { handleApiError } from "@/utils/apiErrors";
import IsLoading from "./IsLoading";

interface TicketFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>;
  ticket: Ticket;
}

const TicketForm: React.FC<TicketFormProps> = ({
  setShowForm,
  showForm,
  setApiErr,
  ticket,
}) => {
  const { setToken, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TicketInput>();

  const onSubmit: SubmitHandler<TicketInput> = async (data) => {
    try {
      const localToken = localStorage.getItem("token");
      const ticketData = await patchTicket(localToken, +ticket?.id, data);
      localStorage.setItem("token", ticketData.token);
      setToken(ticketData.token);
      setShowForm(!showForm);
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
    if (ticket) {
      setValue("name", ticket.name);
      setValue("description", ticket.description);
      setValue("limitations", ticket.limitations);
      setValue("qty_tickets", ticket.qty_tickets);
      setValue("price", ticket.price);
      setValue("is_free", ticket.is_free);
      setValue("updated_at", new Date().toISOString());
    }
  }, [setValue, ticket, showForm]);

  return (
    <>
      {loading ? (
        <IsLoading loading={loading} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label className="text-xs text-gray-400 py-4" htmlFor="name">
            Name
          </label>
          <input
            className="p-4  rounded border-2 border-pink-200"
            {...register("name", {
              required: "Must be at least 4 character",
              minLength: 4,
            })}
            id="name"
            name="name"
          />
          {errors.description && (
            <span className="text-rose-600 text-xs font-bold">
              Name is required and requires to be at least 4 characters
            </span>
          )}
          <label className="text-xs text-gray-400 py-4" htmlFor="description">
            Event description
          </label>
          <input
            className="p-4 rounded border-2 border-pink-200"
            placeholder="Description"
            {...register("description", {
              required: "Description is required",
              minLength: 10,
            })}
            id="description"
            name="description"
          />
          {errors.description && (
            <span className="text-rose-600 text-xs font-bold">
              Description is required and requires to be at least 10 characters
            </span>
          )}
          <label className="text-xs text-gray-400 py-4" htmlFor="limitations">
            Ticket limitations
          </label>
          <p className="text-xs my-2">
            If there any limitations, i.e. the need to bring equipment or age
            limits. Please add here.{" "}
          </p>
          <input
            className="p-4 rounded border-2 border-pink-200"
            placeholder="limitations"
            {...register("limitations", {})}
            id="limitations"
            name="limitations"
          />
          <label className="text-xs text-gray-400 py-4" htmlFor="qty_tickets">
            How many people does the ticket include?
          </label>
          <input
            className="p-4 rounded border-2 border-pink-200"
            placeholder="Heads Per Ticket"
            {...register("qty_tickets", {
              required: "Requires a number",
              valueAsNumber: true,
            })}
            id="qty_tickets"
            name="qty_tickets"
          />
          {errors.qty_tickets && (
            <span className="text-rose-600 text-xs font-bold">
              Heads per ticket requires a number, at least 1
            </span>
          )}
          <label className="text-xs text-gray-400 py-4" htmlFor="price">
            Ticket price
          </label>
          <p className="text-xs my-2">
            For pay-what-you think tickets, leave price empty.
          </p>
          <input
            className="p-4 rounded border-2 border-pink-200"
            placeholder="Ticket Price"
            {...register("price", {
              valueAsNumber: true,
            })}
            id="price"
            name="price"
          />
          {errors.price && (
            <span className="text-rose-600 text-xs font-bold">
              Price needs to be a number or empty for pay-what-you-want tickets.
            </span>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 py-4" htmlFor="is_free">
              Is Event Free? (Check for yes)
            </label>
            <div className="flex items-center gap-4">
              <p className="text-xs my-2">
                Check free if you want to make this ticket free. It will
                override any price you add.
              </p>
              <input
                type="checkbox"
                className="p-4 rounded border-2 border-pink-200"
                {...register("is_free")}
                id="is_free"
                name="is_free"
              />
            </div>
          </div>
          <input
            hidden
            className="p-4 rounded border-2 border-pink-200"
            {...register("updated_at")}
            id="updated_at"
            name="updated_at"
          />

          <input
            className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-pink-500 hover:text-white border-2 border-pink-500 hover:bg-pink-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-pink-500 duration-300 mt-8"
            type="submit"
          />
        </form>
      )}
    </>
  );
};

export default TicketForm;
