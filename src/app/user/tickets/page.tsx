"use client";

import IsLoading from "@/components/IsLoading";
import Layout from "@/components/Layout";
import { useAuth } from "@/components/UserContext";
import UserTicketCard from "@/components/UserTicketCard";
import { UserTicket } from "@/utils/customTypes";
import { getUserTickets } from "@/utils/userApiCalls";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserTickets() {
  const [userTickets, setUserTickets] = useState<UserTicket[] | []>([]);
  const [apiErr, setApiErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setUser, setToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localToken = localStorage.getItem("token");
        const data = await getUserTickets(localToken);
        setUserTickets(data.tickets);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setLoading(false);
      } catch (err) {
        console.log("Something went wrong", err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setApiErr(
              "Your login token has expired. Please login to refresh your token to view these orders."
            );
            setUser(null);
            setToken(null);
            setLoading(false);
          }
          if (err.response?.data.msg) {
            setApiErr(err.response.data.msg);
            setLoading(false);
          }
        } else {
          setApiErr("An unexpected error occurred. Please try again.");
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [setToken, setUser]);

  return (
    <Layout>
      <section className="my-20 flex flex-col justify-center items-center gap-4 px-4 max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-light pb-4 border-b-2 border-pink-200">
          Your Event Tickets
        </h1>
        {loading ? (
          <IsLoading loading={loading} />
        ) : (
          <>
            {apiErr ? (
              <p className="font-bold text-red-500 my-4">{apiErr}</p>
            ) : (
              <>
                {userTickets.length ? (
                  <>
                    {userTickets.map((ticket) => (
                      <UserTicketCard
                        key={ticket.ticket_name}
                        userTicket={ticket}
                      />
                    ))}
                  </>
                ) : (
                  <p>{`You don't have any tickets`}</p>
                )}
              </>
            )}
          </>
        )}
      </section>
    </Layout>
  );
}
