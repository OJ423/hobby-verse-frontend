import { EditUser } from "@/utils/customTypes";
import { patchUser } from "@/utils/userApiCalls";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "./UserContext";
import { useEffect, useState } from "react";
import { handleApiError } from "@/utils/apiErrors";
import IsLoading from "./IsLoading";

interface EditUserProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>;
}

const EditUserForm: React.FC<EditUserProps> = ({
  setShowForm,
  showForm,
  setApiErr,
}) => {
  const { setToken, user, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUser>();

  const onSubmit: SubmitHandler<EditUser> = async (data) => {
    try {
      setLoading(true)
      const localToken = localStorage.getItem("token");
      const userData = await patchUser(localToken, user?.id, data);
      localStorage.setItem("token", userData.token);
      setToken(userData.token);
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      setLoading(false)
      setShowForm(!showForm);
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

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [setValue, user, showForm]);

  return (
    <>
      {loading ? (
        <IsLoading loading={loading} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label className="text-xs text-gray-400 py-4" htmlFor="name">
            Name
          </label>
          <input
            className="p-4 mb-8 rounded border-2 border-pink-200"
            {...register("name", {
              required: "Must be at least 4 character",
              minLength: 4,
            })}
            id="name"
            name="name"
          />
          <label className="text-xs text-gray-400 py-4" htmlFor="email">
            Email address
          </label>
          <input
            className="p-4 mb-4 rounded border-2 border-pink-200"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            id="email"
            name="email"
          />
          {errors.email && (
            <span className="mb-4 text-rose-600 text-xs font-bold">
              Correct email format is required
            </span>
          )}

          <input
            className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-pink-500 hover:text-white border-2 border-pink-500 hover:bg-pink-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-pink-500 duration-300"
            type="submit"
          />
        </form>
      )}
    </>
  );
};

export default EditUserForm;
