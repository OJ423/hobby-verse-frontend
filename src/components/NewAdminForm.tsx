import { NewAdminUser } from "@/utils/customTypes";
import { patchAdminUser } from "@/utils/userApiCalls";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "./UserContext";
import { useEffect } from "react";

export default function NewAdminForm() {
  const { setToken } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<NewAdminUser>({ defaultValues: { email: "", role: "staff" } });

  const onSubmit: SubmitHandler<NewAdminUser> = async (data) => {
    try {
      console.log(data);
      const localToken = localStorage.getItem("token");
      const userData = await patchAdminUser(localToken, data);
      console.log(userData);
      localStorage.setItem("token", userData.token);
      setToken(userData.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: "",
        role: "staff"
       })
    }
  }, [formState, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label className="text-xs text-gray-400 py-4" htmlFor="email">
        Email address
      </label>
      <input
        className="p-4 mb-4 rounded"
        placeholder="Email Address"
        {...register("email", {
          required: "Email is required",
        })}
        id="email"
        name="email"
      />
      {errors.email && (
        <span className="mb-4 text-rose-600 text-xs font-bold">
          Correct email format is required
        </span>
      )}
      <label className="text-xs text-gray-400 py-4" htmlFor="role">
        User Role
      </label>
      <select
        className="p-4 mb-8 rounded"
        {...register("role", {
          required: "Select one",
        })}
        id="role"
        name="role"
      >
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>

      <input
        className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-pink-500 hover:text-white border-2 border-pink-500 hover:bg-pink-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-pink-500 duration-300"
        type="submit"
      />
    </form>
  );
}
