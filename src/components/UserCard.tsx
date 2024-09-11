"use client";

import { useAuth } from "@/components/UserContext";
import { User } from "@/utils/customTypes";
import { getAllAdminStaff, patchAdminUser } from "@/utils/userApiCalls";
import axios from "axios";
import { useEffect, useState } from "react";
import IsLoading from "./IsLoading";
import { dateConverter } from "@/utils/dateConverter";
import StyledButton from "./StyledButton";

export default function UserCard() {
  const { setUser, setToken } = useAuth();
  const [users, setUsers] = useState<User[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userErr, setUserErr] = useState<string | null>(null);

  const handleRemoveAdmin = async (email:string) => {
    try {
      const localToken = localStorage.getItem("token")
      const body = {
        email:email,
        role:"customer"
      }
      await patchAdminUser(localToken, body)
    }
    catch(err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const localToken = localStorage.getItem("token");
        const userData = await getAllAdminStaff(localToken);
        localStorage.setItem("token", userData.token)
        setToken(userData.token)
        setUsers(userData.users);
        setLoading(false);
        setUserErr(null);
      } catch (err) {
        console.log("Something went wrong", err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setUserErr(
              "Your login token has expired. Please login to refresh your token to view these orders."
            );
            setUser(null);
            setToken(null);
            setLoading(false);
          }
        } else {
          // Handle other types of errors (e.g., network errors)
          setUserErr("An unexpected error occurred. Please try again.");
          setLoading(false);
        }
      }
    };
    fetchData();
  });

  return (
    <>
      {loading ? (
        <IsLoading loading={loading} />
      ) : userErr ? (
        <p>{userErr}</p>
      ) : (
        <>
          <div
              className="py-8 px-4 flex gap-8 items-center justify-between flex-wrap border-b-2 border-pink-200"
            >
              <p className="uppercase text-xs font-bold">Date Joined</p>
              <p className="uppercase text-xs font-bold">Name</p>
              <p className="uppercase text-xs font-bold">Email</p>
              <p className="uppercase text-xs font-bold">Role</p>
            </div>
          {users.map((user) => (
            <div key={user.id} className="flex flex-col gap-8 border-b-2 border-pink-200 cursor-pointer transition-all duration-500 hover:bg-pink-100 rounded py-8">
              <div className="px-4 flex gap-8 items-center justify-between w-full flex-wrap">
                <div className="flex items-center w-full justify-between gap-8 flex-wrap">
                  <p className="text-xs text-gray-500 font-medium">
                    {dateConverter(user.created_at)}
                  </p>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-xs text-gray-500 font-medium">
                    {user.email}
                  </p>
                  <p className="font-bold">{user.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 col-span-2 px-4">
                <p className="text-xs text-gray-500">Change user status</p>
                {user.role === "admin" ? null : (
                  <StyledButton src="" linkText="Admin" />
                )}
                {user.role === "staff" ? null : (
                  <StyledButton src="" linkText="Staff" />
                )}
                <div onClick={() => handleRemoveAdmin(user.email)}>
                  <StyledButton src="" linkText="Remove" />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
