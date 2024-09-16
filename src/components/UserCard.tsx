"use client";

import { useAuth } from "@/components/UserContext";
import { NewAdminUser, User } from "@/utils/customTypes";
import { getAllAdminStaff, patchAdminUser } from "@/utils/userApiCalls";
import { useEffect, useState } from "react";
import IsLoading from "./IsLoading";
import { dateConverter } from "@/utils/dateConverter";
import StyledButton from "./StyledButton";
import { handleApiError } from "@/utils/apiErrors";

export default function UserCard() {
  const { setUser, setToken } = useAuth();
  const [users, setUsers] = useState<User[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiErr, setApiErr] = useState<string | null>(null);
  const localToken = localStorage.getItem("token")

  const handleRemoveAdmin = async (email:string) => {
    try {
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

  const handleRoleChange = async (body: NewAdminUser) => {
    try {
      const data = await patchAdminUser(localToken, body)
      setToken(data.token)
      localStorage.setItem("token", data.token)

    } catch(err) {
      handleApiError({
        err,
        setApiErr,
        setLoading,
        setUser,
        setToken
      });

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
        setApiErr(null);
      } catch (err) {
        handleApiError({
          err,
          setApiErr,
          setLoading,
          setUser,
          setToken
        });
      }
    };
    fetchData();
  });

  return (
    <>
      {loading ? (
        <IsLoading loading={loading} />
      ) : apiErr ? (
        <p>{apiErr}</p>
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
                  <button
                  onClick={() => {
                    const body = {email: user.email, role: "staff"}
                    handleRoleChange(body)
                  }}
                  className="border-solid border-4 border-red-500 text-red-500 py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-500 ease-out text-xs"
                >
                  Admin
                </button>
                )}
                {user.role === "staff" ? null : (
                  <button
                  onClick={() => {
                    const body = {email: user.email, role: "admin"}
                    handleRoleChange(body)
                  }}
                  className="border-solid border-4 border-red-500 text-red-500 py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-500 ease-out text-xs"
                >
                  Staff
                </button>
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
