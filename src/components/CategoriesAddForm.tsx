import { CategoryInput } from "@/utils/customTypes";
import { useEffect, useState } from "react";
import { useAuth } from "./UserContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { postCategory } from "@/utils/eventApiCalls";
import { handleApiError } from "@/utils/apiErrors";
import IsLoading from "./IsLoading";

interface CategoriesAddFormProps {
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoriesAddForm: React.FC<CategoriesAddFormProps> = ({ setApiErr }) => {
  const { setToken, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  // Form

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<CategoryInput>();

  const onSubmit: SubmitHandler<CategoryInput> = async (data) => {
    try {
      setLoading(true)
      const localToken = localStorage.getItem("token");
      const eventData = await postCategory(localToken, data);
      localStorage.setItem("token", eventData.token);
      setToken(eventData.token);
      setLoading(false)
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
    // Reset form
    if (formState.isSubmitSuccessful) {
      reset({
        name: "",
        description: "",
      });
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <>
      {loading ? (
        <IsLoading loading={loading} />
      ) : (
        <>
          <h2 className="text-xl font-bold">Add a new category</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <label className="text-xs text-gray-400 pt-4" htmlFor="name">
              Category Name:
            </label>
            <input
              className="p-4 w-full rounded border-2 border-pink-200 w-20"
              {...register("name", {
                required:
                  "Category name is required and must be more than 4 characters",
                minLength: 4,
              })}
              id="name"
              name="name"
            />
            {errors.name && (
              <span className="text-rose-600 text-xs font-bold">
                Category name is required and must be more than 4 characters
              </span>
            )}
            <label className="text-xs text-gray-400 pt-4" htmlFor="name">
              Category Description:
            </label>
            <textarea
              className="p-4 rounded border-2 border-pink-200"
              {...register("description")}
              id="description"
              name="description"
            />

            <input
              className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-pink-500 hover:text-white border-2 border-pink-500 hover:bg-pink-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-pink-500 duration-300"
              type="submit"
              value="Submit"
            />
          </form>
        </>
      )}
    </>
  );
};

export default CategoriesAddForm;
