import { Ticket } from "@/utils/customTypes"
import { dateConverter } from "@/utils/dateConverter"
import StyledButton from "./StyledButton"
import { useState } from "react"
import { deleteTicket } from "@/utils/ticketApiCalls";
import axios from "axios";
import { useAuth } from "./UserContext";

interface AdminTicketProps {
  ticket: Ticket;
  handleDisplayForm: () => void;
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>;
}

const AdminTicketCard: React.FC<AdminTicketProps> = ({ticket, handleDisplayForm, setApiErr}) => {
  const [deleteCheck, setDeleteCheck] = useState<boolean>(false);
  const {setUser, setToken} = useAuth()
  

  const handleDeleteCheck = () => {
    setDeleteCheck(!deleteCheck);
  };

  const handleDelete = async () => {
    try {
      const localToken = localStorage.getItem("token");
      const data = await deleteTicket(localToken, +ticket?.id);
      setToken(data.token)
      localStorage.setItem("token", data.token)
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

  return(<>
    <section
      key={ticket.id}
      className="flex w-fit gap-8 items-center justify-between pb-4 cursor-pointer transition-all duration-500 hover:bg-pink-100 py-2 px-4 w-full"
    >
      <p className="font-black text-3xl">{ticket.id}</p>
      <div className="flex flex-col">
        <p className="font-bold text-gray-500">{ticket.name}</p>
        <p className="font-light text-gray-500 text-sm">
          {ticket.description}
        </p>
        {ticket.limitations ? (
          <p className="font-light text-gray-500 text-sm">
            {ticket.limitations}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col">
        <p>Ticket # {ticket.id}</p>
        <p className="font-semibold text-xs">
          {dateConverter(ticket.created_at)}
        </p>
      </div>
      <p className="font-bold">{`${
        ticket.is_free
          ? "Free"
          : !ticket.price
          ? "Pay What You Want"
          : "£" + ticket.price
      }`}</p>
    </section>
    <section className="flex items-center justify-end gap-4 w-full pb-4 border-b-2 border-pink-200">
      <div onClick={handleDisplayForm}>
        <StyledButton src={``} linkText="Edit" />
      </div>
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
    </section>
  </>)
}

export default AdminTicketCard