import { Category, CategoryInput } from "@/utils/customTypes";
import { useEffect } from "react";
import { useAuth } from "./UserContext";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { patchCategory } from "@/utils/eventApiCalls";

interface CategoriesEditFormProps {
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  category: Category;
}

const CategoriesEditForm: React.FC<CategoriesEditFormProps> = ({
  setApiErr,
  category,
  setShowForm,
  showForm,
}) => {
  const { setToken, setUser } = useAuth();

  // Form

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryInput>();

  const onSubmit: SubmitHandler<CategoryInput> = async (data) => {
    try {
      const localToken = localStorage.getItem("token");
      const eventData = await patchCategory(localToken, category.id, data);
      localStorage.setItem("token", eventData.token);
      setToken(eventData.token);
      setShowForm(!showForm);
    } catch (err) {
      console.log("Something went wrong", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setApiErr(
            "Your login token has expired. Please login to refresh your token to complete this action."
          );
          setUser(null);
          localStorage.removeItem("user");
          setToken(null);
          localStorage.removeItem("token");
        }
        if (err.response?.data.msg.length) {
          setApiErr(err.response.data.msg);
        }
      } else {
        setApiErr("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    // set values of form
    setValue("name", category.name);
    setValue("description", category.description);

  }, [setValue, category]);

  return (
    <>
      <h2 className="text-xl font-bold">Update the category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
        <input
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
  );
};

export default CategoriesEditForm;
