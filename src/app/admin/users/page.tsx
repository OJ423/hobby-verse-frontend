"use client";

import IsLoading from "@/components/IsLoading";
import Layout from "@/components/Layout";
import NewAdminForm from "@/components/NewAdminForm";
import UserCard from "@/components/UserCard";
import { useAuth } from "@/components/UserContext";
import { handleApiError } from "@/utils/apiErrors";
import { User } from "@/utils/customTypes";
import { getAllAdminStaff } from "@/utils/userApiCalls";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const { token, setUser, setToken } = useAuth();
  const [users, setUsers] = useState<User[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiErr, setApiErr] = useState<string | null>(null);
  const [adminCheck, setAdminCheck] = useState<boolean>(false);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      if (parsedUser.role === "admin") setAdminCheck(true);
    }

    const fetchData = async () => {
      try {
        const localToken = localStorage.getItem("token");
        const userData = await getAllAdminStaff(localToken);
        localStorage.setItem("token", userData.token);
        setToken(userData.token);
        setUsers(userData.users);
        setLoading(false);
        setApiErr(null);
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
    fetchData();
  }, [setToken, setUser, token]);

  return (
    <>
      <Layout>
        {loading ? (
          <IsLoading loading={loading} />
        ) : apiErr ? (
          <p className="my-40">{apiErr}</p>
        ) : adminCheck ? (
          <>
            <section className="flex flex-col justify-center items-center gap-4 mt-16 w-full pt-4 mb-20">
              <h1 className="text-3xl font-light pb-4 border-b-2 border-pink-200 w-fit text-center">
                Admin & Staff Management
              </h1>
              <p>Current staff and admin:</p>
              <section className="flex flex-wrap gap-16 justify-center items-center">
                <div className="flex flex-col">
                  {users.map((user) => (
                    <UserCard
                      user={user}
                      key={user.id}
                      setApiErr={setApiErr}
                      setLoading={setLoading}
                    />
                  ))}
                </div>
                <section className="flex flex-col gap-4 p-4 bg-pink-100 rounded">
                  <h2 className="text-xl font-bold pb-4 border-b-2 border-pink-200">
                    Add New Staff and Admin
                  </h2>
                  <p className="mb-8">
                    Add other people to your staff and admin team:
                  </p>
                  <NewAdminForm />
                </section>
              </section>
            </section>
          </>
        ) : (
          <>
            <div className="my-20">
              <h2 className="text-xl font-bold pb-4 border-b-2 border-pink-200 mb-4">
                Unauthorised
              </h2>
              <p>You cannot view this page.</p>
            </div>
          </>
        )}
      </Layout>
    </>
  );
}
