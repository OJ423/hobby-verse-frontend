import { Category } from "@/utils/customTypes";
import StyledButton from "./StyledButton";
import { useState } from "react";
import { deleteCategory } from "@/utils/eventApiCalls";
import { useAuth } from "./UserContext";
import axios from "axios";
import FormDrawer from "./FormDrawer";
import CategoriesEditForm from "./CategoriesEditForm";

interface CategoryCardProps {
  category: Category;
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, setApiErr }) => {
  const { setUser, setToken } = useAuth();
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleDisplayForm = () => {
    setShowForm(!showForm);
  };

  // Delete Category
  const [deleteCheck, setDeleteCheck] = useState<boolean>(false);

  const handleDeleteCheck = () => {
    setDeleteCheck(!deleteCheck);
    setApiErr(null);
  };

  const handleDelete = async (catId: number) => {
    try {
      const localToken = localStorage.getItem("token");
      const data = await deleteCategory(localToken, catId);
      setToken(data.token);
      localStorage.setItem("token", data.token);
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
        if (err.response?.data.msg.startsWith("Key (id)")) {
          setApiErr(
            "This category is used in your events. Please change the events with this category to delete it."
          );
        }
      } else {
        setApiErr("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="flex flex-col mx-auto md:flex-row md:w-full items-center justify-between gap-4">
      <div className="flex flex-col border-2 border-pink-200 p-4 rounded flex-wrap">
        <h3 className="font-bold text-lg">{category.name}</h3>
        <p>{category.description}</p>
      </div>
      <div className="flex gap-4 items-center mb-4 md:mb-0">
        <button
          onClick={handleDisplayForm}
          className="border-solid border-4 border-black py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out text-xs"
        >
          Edit
        </button>
        <FormDrawer showForm={showForm} handleDisplayForm={handleDisplayForm}>
          <CategoriesEditForm
            category={category}
            setApiErr={setApiErr}
            setShowForm={setShowForm}
            showForm={showForm}
          />
        </FormDrawer>
        {!deleteCheck ? (
          <button
            onClick={handleDeleteCheck}
            className="border-solid border-4 border-red-500 text-red-500 py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-500 ease-out text-xs"
          >
            Delete
          </button>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleDelete(category.id)}
                className="border-solid border-4 border-red-500 text-red-500 py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-500 ease-out text-xs"
              >
                Confirm
              </button>
              <div onClick={handleDeleteCheck}>
                <StyledButton src="" linkText="Cancel" />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryCard;
