"use client";

import EditUserForm from "@/components/EditUserForm";
import FormDrawer from "@/components/FormDrawer";
import Layout from "@/components/Layout";
import StyledButton from "@/components/StyledButton";
import { useAuth } from "@/components/UserContext";
import { dateConverter } from "@/utils/dateConverter";
import { deleteUser } from "@/utils/userApiCalls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const { user, setUser, setToken } = useAuth();
  const [deleteCheck, setDeleteCheck] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [apiErr, setApiErr] = useState<string | null>(null);
  const router = useRouter()

  const handleDisplayForm = () => {
    setShowForm(!showForm);
  };

  const handleDeleteCheck = () => {
    setDeleteCheck(!deleteCheck);
  };

  const handleDelete = async () => {
    try {
      const localToken = localStorage.getItem("token");
      await deleteUser(localToken, user?.id);
      setUser(null)
      localStorage.removeItem("user")
      setToken(null)
      localStorage.removeItem("token")
      router.push('/')
    } catch (err) {
      console.log("Something went wrong", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setApiErr(
            "Your login token has expired. Please login to refresh your token to complete this action."
          );
          setUser(null);
          setToken(null);
        }
      } else {
        // Handle other types of errors (e.g., network errors)
        setApiErr("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <section className="flex flex-col items-start justify-start mt-20 rounded-xl mx-8 p-8 gap-4 border-4 border-pink-200">
        {apiErr ? <p className="text-red-500 font-bold">{apiErr}</p> : null}
        {user ? (
          <>
            <h1 className="text-3xl font-light pb-4 border-b-2 border-pink-200">
              Profile
            </h1>
            <div className="flex gap-4 items-center justify-start">
              <p className="text-xs text-gray-400">Name:</p>
              <p className="font-bold">{user?.name}</p>
            </div>
            <div className="flex gap-4 items-center justify-start">
              <p className="text-xs text-gray-400">Email:</p>
              <p className="font-bold">{user?.email}</p>
            </div>
            <div className="flex gap-4 items-center justify-start">
              <p className="text-xs text-gray-400">Date Joined:</p>
              <p className="font-bold">{dateConverter(user?.created_at)}</p>
            </div>
            <div className="flex gap-4 items-between justify-center">
              <div onClick={handleDisplayForm}>
                <StyledButton src="" linkText="Edit" />
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
                  <button
                    onClick={handleDelete}
                    className="border-solid border-4 border-red-500 text-red-500 py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-500 ease-out text-xs"
                  >
                    Confirm
                  </button>
                  <div onClick={handleDeleteCheck}>
                    <StyledButton src="" linkText="Cancel" />
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <p>You need to login to see your profile</p>
        )}
      </section>
      {user ? (
        <section className="flex flex-col gap-4 my-20 px-4">
          <h2 className="text-xl font-bold pb-4 border-b-2 border-pink-200">
            Useful links
          </h2>
          <div className="flex gap-4 items-center">
            <StyledButton src="/user/orders" linkText="Your orders" />
            <StyledButton src="/events" linkText="Events" />
          </div>
        </section>
      ) : null}
      <FormDrawer showForm={showForm} handleDisplayForm={handleDisplayForm}>
        <h2 className="font-bold text-xl">Edit your profile</h2>
        <EditUserForm
          setShowForm={setShowForm}
          showForm={showForm}
          setApiErr={setApiErr}
        />
      </FormDrawer>
    </Layout>
  );
}
