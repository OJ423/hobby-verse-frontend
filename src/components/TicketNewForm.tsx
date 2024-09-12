import {  NewTicketInput } from "@/utils/customTypes";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "./UserContext";
import axios from "axios";
import { postTicket } from "@/utils/ticketApiCalls";
import { useEffect } from "react";

interface TicketNewFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>;
}

const TicketNewForm: React.FC<TicketNewFormProps> = ({
  setShowForm,
  showForm,
  setApiErr,
}) => {
  const { setToken, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<NewTicketInput>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ 
        name: "",
        description: "",
        limitations: "",
        qty_tickets: 1,
        price: null,
        is_free: false

       })
    }
  },[formState, reset])

  const onSubmit: SubmitHandler<NewTicketInput> = async (data) => {
    try {
      const localToken = localStorage.getItem("token");
      const ticketData = await postTicket(localToken, data);
      localStorage.setItem("token", ticketData.token);
      setToken(ticketData.token);
      setShowForm(!showForm);
    } catch (err) {
      console.log("Something went wrong", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setApiErr(
            "Your login token has expired. Please login to refresh your token to complete this action."
          );
          setUser(null);
          localStorage.removeItem("user")
          setToken(null);
          localStorage.removeItem("token")
        }
      } else {
        setApiErr("An unexpected error occurred. Please try again.");
      }
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label className="text-xs text-gray-400 py-4" htmlFor="name">
        Name
      </label>
      <input
        className="p-4  rounded border-2 border-pink-200"
        placeholder="Ticket Name"
        {...register("name", {
          required: "Must be at least 4 character",
          minLength: 4,
        })}
        id="name"
        name="name"
      />
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
        Event limitations
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
      {errors.description && (
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
      {errors.description && (
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
            Check the box if you want to make this ticket free. It will override any price you add.
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
        className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-pink-500 hover:text-white border-2 border-pink-500 hover:bg-pink-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-pink-500 duration-300 mt-8"
        type="submit"
      />
    </form>
  );
};

export default TicketNewForm;