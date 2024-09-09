"use client"

import { RegistrationInputs } from "@/utils/customTypes";
import { registerUser } from "@/utils/userApiCalls";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function RegistrationForm() {
  const [registrationErr, setRegistrationErr] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationInputs>();

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    try {
      await registerUser(data);
      router.push("/user/verify-email");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("There's been an error", err);
        setRegistrationErr("We're sorry but there has been an error");
      }
    }
  };

  return (
    <>
      <h1 className="font-bold text-3xl mb-8">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate={true}
        className="flex flex-col mb-8"
      >
        <input
          className="p-4 mb-4 rounded"
          placeholder="Your name"
          {...register("name", {
            required: "name is required",
            minLength: 4,
          })}
          name="name"
          id="name"
        />
        {errors.name && (
          <span className="mb-4 text-rose-600 text-xs font-bold">
            Name needs to be 4 characters or more
          </span>
        )}
        <input
          className="p-4 mb-4 rounded"
          placeholder="Email Address"
          {...register("email", {
            required: "Email is required",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          name="email"
          id="email"
        />
        {errors.email && (
          <span className="mb-4 text-rose-600 text-xs font-bold">
            Email is required
          </span>
        )}
        <input
          className="p-4 mb-4 rounded"
          placeholder="Password"
          {...register("password", {
            required: "Password required",
            minLength: 6,
          })}
          name="password"
          type="password"
        />
        {errors.password && (
          <span className="mb-4 text-rose-600 text-xs font-bold">
            Password needs to be 6 characters or more
          </span>
        )}
        <input
          className="p-4 mb-8 rounded"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          name="confirmPassword"
          id="confirmPassword"
          type="password"
        />
        {errors.confirmPassword && (
          <span className="mb-4 text-rose-600 text-xs font-bold">
            Your passwords do not match.
          </span>
        )}

        <input
          className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-pink-500 hover:text-white border-2 border-pink-500 hover:bg-pink-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-pink-500 duration-300"
          type="submit"
        />
      </form>
      <p>All ready registered? <Link href="/user/login" className="font-bold text-pink-500 mt-8">Login</Link>.</p>
      {registrationErr ? (
        <p className="font-bold mt-8 text-rose-600 text-center">
          {registrationErr}
        </p>
      ) : null}
    </>
  );
}
