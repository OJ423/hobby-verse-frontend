"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInputs } from "@/utils/customTypes";
import Link from "next/link";
import { useAuth } from "./UserContext";
import { logUserIn } from "@/utils/userApiCalls";

export default function LoginForm() {
  const { setToken, setUser } = useAuth();
  const [loginErr, setLoginErr] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState<boolean>(false)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      setLoggingIn(true)
      const userData = await logUserIn(data);
      await setUser(userData.user);
      await setToken(userData.token);
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));
      router.push("/events");
    } catch (error) {
      setLoggingIn(false)
      if (error instanceof Error && error.message === "Request failed with status code 404" || error instanceof Error && error.message === "Request failed with status code 400") {
        setLoginErr("Email or password do not match");
      }
      console.log(error instanceof Error && error.message);
    }
  };

  return (
    <>
      {!loggingIn ?
      <>
      <h1 className="font-bold text-3xl mb-8">Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-8">
        <label htmlFor="email">Email address</label>
        <input
          className="p-4 mb-4 rounded"
          placeholder="Email Address"
          {...register("email", {
            required: "Email is required",
          })}
          id="email"
          name="email"
          autoComplete="email"
          />
        {errors.email && (
          <span className="mb-4 text-rose-600 text-xs font-bold">
            Correct email format is required
          </span>
        )}
        <label htmlFor="password">Password</label>
        <input
          className="p-4 mb-8 rounded"
          placeholder="Password"
          {...register("password", {
            required: "Password required",
            minLength: 6,
          })}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          />
        {errors.password && (
          <span className="mb-4 text-rose-600 text-xs font-bold">
            Password needs to be 6 or more characters
          </span>
        )}

        <input
          className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-pink-500 hover:text-white border-2 border-pink-500 hover:bg-pink-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-pink-500 duration-300"
          type="submit"
          />
      </form>
      <p>Not got an account? <Link href="/user/register" className="font-bold text-pink-500 mt-8">Register</Link>.</p>
      {loginErr ? (
        <p className="font-bold mt-8 text-rose-600 text-center">{loginErr}</p>
      ) : null}
      </>
      :
      <p className="font-bold">Logging you in</p>
    }
      </>
    );
  }
  