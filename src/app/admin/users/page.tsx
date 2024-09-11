"use client";

import Layout from "@/components/Layout";
import NewAdminForm from "@/components/NewAdminForm";
import UserCard from "@/components/UserCard";
import { useAuth } from "@/components/UserContext";

export default function AdminUsers() {
  const { user } = useAuth();

  return (
    <>
      <Layout>
        {user ? (
          user.role === "admin" ? (
            <>
              <section className="flex flex-col gap-4 mt-16 w-full pt-4 md:px-0 md:w-9/12 lg:w-2/3 mb-20">
                <h1 className="text-3xl font-light pb-4 border-b-2 border-pink-200">
                  Admin & Staff Management
                </h1>
                <p>Current staff and admin:</p>
                <section className="flex gap-16 justify-between">
                  <div className="flex flex-col">
                    
                <UserCard />
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
          )
        ) : (
          <div className="my-20">
            <h2 className="text-xl font-bold pb-4 border-b-2 border-pink-200 mb-4">
              Unauthorised
            </h2>
            <p>You cannot view this page.</p>
          </div>
        )}
      </Layout>
    </>
  );
}
