"use client";

import Layout from "@/components/Layout";
import { useAuth } from "@/components/UserContext";
import { verifyNewUserAccount } from "@/utils/userApiCalls";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const { setUser, setToken } = useAuth();
  const [params, setParams] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token')
    setParams(token)

    if (params) {
      const fetchData = async () => {
        try {
          const data = await verifyNewUserAccount(params);
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));

          await setTimeout(() => {
            router.push("/events");
          }, 2000);
        } catch (err: unknown) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [params, router, setToken, setUser]);
  console.log(params)

  return (
    <Layout>
        {params ? (
          <>
            <div className="my-40">
              <h1 className="text-3xl mb-8 font-bold">
                Bear with us, while we validate your account.
              </h1>
              <p>You will be up and running in a jiffy.</p>

            </div>
          </>
        ) : (
          <div className="my-40">
            <h1 className="text-3xl mb-8 font-bold">
              Please verify your email.
            </h1>
            <p>
              Check your email and click on the link to verify your Hobby Verse
              account.
            </p>
          </div>
        )}
      </Layout>
  );
}
