"use client";

import AddTicket from "@/components/AddTicket";
import AdminTicketCard from "@/components/AdminTicketCard";
import FormDrawer from "@/components/FormDrawer";
import Layout from "@/components/Layout";
import TicketForm from "@/components/TicketForm";
import { useAuth } from "@/components/UserContext";
import { Ticket } from "@/utils/customTypes";
import { getAllTickets } from "@/utils/ticketApiCalls";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Tickets() {
  const { token, setToken, setUser } = useAuth();
  const [adminCheck, setAdminCheck] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[] | []>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [apiErr, setApiErr] = useState<string | null>(null);

  const handleDisplayForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      if (parsedUser.role === "staff" || parsedUser.role === "admin")
        setAdminCheck(true);
    }

    const fetchData = async () => {
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
            localStorage.removeItem("user")
            setToken(null);
            localStorage.removeItem("token")
            setTickets([]);
          }
        } else {
          // Handle other types of errors (e.g., network errors)
          setApiErr("An unexpected error occurred. Please try again.");
        }
      }
    };
    fetchData();
  }, [token, setUser, setToken]);
  return (
    <Layout>
      <section className="flex flex-col items-start justify-start my-20 rounded-xl mx-8 gap-4 max-w-screen-md">
        {adminCheck ? (
          <>
            <div className="flex justify-between w-full pb-4">
              <h1 className="text-3xl font-light border-b-2 border-pink-200">
                Tickets
              </h1>
              <AddTicket setApiErr={setApiErr} />
            </div>
            <p>
              Tickets are reusable. Assign a ticket to one or more events. You
              can decide the ticket quantity for each individual event.
            </p>
            {apiErr ? <p className="text-red-500 font-bols">{apiErr}</p> : null}
            
            {tickets.map((ticket) => (
              <>
                <AdminTicketCard
                  key={ticket.id}
                  ticket={ticket}
                  handleDisplayForm={handleDisplayForm}
                  setApiErr={setApiErr}
                />
                <FormDrawer
                  showForm={showForm}
                  handleDisplayForm={handleDisplayForm}
                >
                  <TicketForm
                    showForm={showForm}
                    setShowForm={setShowForm}
                    setApiErr={setApiErr}
                    ticket={ticket}
                  />
                </FormDrawer>
              </>
            ))}
          </>
        ) : (
          <p>You need to be staff or admin to see this page.</p>
        )}
      </section>
    </Layout>
  );
}
