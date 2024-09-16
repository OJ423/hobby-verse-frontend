import { Category, Event, EventEditInput } from "@/utils/customTypes";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "./UserContext";
import { useEffect, useState } from "react";
import { getCategories, patchEvent } from "@/utils/eventApiCalls";
import { formDateConverter } from "@/utils/dateConverter";
import { handleApiError } from "@/utils/apiErrors";
import IsLoading from "./IsLoading";

interface EventEditFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>;
  event: Event;
  selectedImage: string;
}

const EventEditForm: React.FC<EventEditFormProps> = ({
  setShowForm,
  showForm,
  setApiErr,
  event,
  selectedImage,
}) => {
  const { setToken, setUser } = useAuth();
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventEditInput>();

  const startDate = watch("date");

  const onSubmit: SubmitHandler<EventEditInput> = async (data) => {
    try {
      const getCategoryNameById = (): number | undefined => {
        setLoading(true)
        const category = categories.find(
          (category) => category.id === +data.category_name
        );
        if (category) return category?.id;
        else {
          return 1;
        }
      };
      const requestBody = {
        name: data.name,
        description: data.description,
        date: data.date,
        end_date: data.end_date,
        location: data.location,
        capacity: data.capacity,
        event_category_id: getCategoryNameById(),
        category_name: data.category_name,
        updated_at: data.updated_at,
        img: data.img,
        status: data.status,
      };
      const localToken = localStorage.getItem("token");
      const eventData = await patchEvent(localToken, event.id, requestBody);
      localStorage.setItem("token", eventData.token);
      setToken(eventData.token);
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
    // Fetch Category Data
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (err) {
        console.log("Error fetching categories", err);
        setApiErr(
          "Error fetching the event categories, please refresh the page."
        );
      }
    };
    fetchData();
    // Set Existing Form Values
    if (event) {
      setValue("name", event.name);
      setValue("description", event.description);
      setValue("location", event.location);
      setValue("capacity", event.capacity);
      setValue("event_category_id", event.event_category_id);
      setValue("category_name", event.category_name);
      setValue("date", formDateConverter(event.date)); // Set the value for the datetime-local input
      setValue("end_date", formDateConverter(event.end_date));
      setValue("updated_at", new Date().toISOString().slice(0, 16));
      let newImg: string;
      if (selectedImage.length) {
        newImg = selectedImage;
      } else if (event.img?.length) {
        newImg = event.img;
      } else {
        newImg = "/event-placeholder-img.webp";
      }
      setValue("img", newImg);
      setValue("status", event.status);
    }
  }, [setApiErr, event, setValue, selectedImage]);

  return (
    <>
      {loading ? (
        <IsLoading loading={loading} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label className="text-xs text-gray-400 py-4" htmlFor="name">
            Event Name
          </label>
          <input
            className="p-4  rounded border-2 border-pink-200"
            {...register("name", {
              required: "Must be at least 4 character",
              minLength: 4,
            })}
            id="name"
            name="name"
          />
          {errors.name && (
            <span className="text-rose-600 text-xs font-bold">
              Name is required and requires to be at least 4 characters
            </span>
          )}
          <label className="text-xs text-gray-400 py-4" htmlFor="description">
            Event description
          </label>
          <input
            className="p-4 rounded border-2 border-pink-200"
            placeholder="Description"
            {...register("description", {
              required: "Description is required",
              minLength: 10,
            })}
            id="description"
            name="description"
          />
          {errors.description && (
            <span className="text-rose-600 text-xs font-bold">
              {errors.description.message}
            </span>
          )}
          <label className="text-xs text-gray-400 py-4" htmlFor="date">
            Event Date
          </label>
          <input
            type="datetime-local"
            className="p-4 rounded border-2 border-pink-200"
            placeholder="Date & Time"
            {...register("date", {
              required: "Date must be provided",
            })}
            id="date"
            name="date"
          />
          {errors.date && (
            <span className="text-rose-600 text-xs font-bold">
              {errors.date.message}
            </span>
          )}
          <label className="text-xs text-gray-400 py-4" htmlFor="end_date">
            Event End Date
          </label>
          <input
            type="datetime-local"
            className="p-4 rounded border-2 border-pink-200"
            placeholder="Date & Time"
            {...register("end_date", {
              required: "Date must be provided",
              validate: (value) => {
                if (startDate && new Date(value) <= new Date(startDate)) {
                  return "End date must be after the start date";
                }
              },
            })}
            id="end_date"
            name="end_date"
          />
          {errors.end_date && (
            <span className="text-rose-600 text-xs font-bold">
              {errors.end_date.message}
            </span>
          )}
          <label className="text-xs text-gray-400 py-4" htmlFor="qty_tickets">
            Event Location
          </label>
          <input
            className="p-4 rounded border-2 border-pink-200"
            placeholder="location"
            {...register("location")}
            id="location"
            name="location"
          />
          <label className="text-xs text-gray-400 py-4" htmlFor="price">
            Capacity
          </label>
          <input
            className="p-4 rounded border-2 border-pink-200"
            placeholder="Capacity"
            {...register("capacity", {
              valueAsNumber: true,
            })}
            id="capacity"
            name="capacity"
          />
          {errors.capacity && (
            <span className="text-rose-600 text-xs font-bold">
              Capacity needs to be a number greater than 0.
            </span>
          )}
          <input
            hidden
            className="p-4 rounded border-2 border-pink-200"
            {...register("event_category_id", {
              valueAsNumber: true,
            })}
            id="event_category_id"
            name="event_category_id"
          />
          <label className="text-xs text-gray-400 py-4" htmlFor="category_name">
            Category Name
          </label>
          <select
            className="p-4 rounded border-2 border-pink-200"
            {...register("category_name")}
            id="category_name"
            name="category_name"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            hidden
            className="p-4 rounded border-2 border-pink-200"
            {...register("updated_at")}
            id="updated_at"
            name="updated_at"
          />
          <input
            hidden
            className="p-4 rounded border-2 border-pink-200"
            placeholder="Image"
            {...register("img")}
            id="img"
            name="img"
          />
          <label className="text-xs text-gray-400 py-4" htmlFor="status">
            Event Date
          </label>
          <select
            className="p-4 rounded border-2 border-pink-200"
            {...register("status")}
            id="status"
            name="status"
          >
            <option value={"published"}>Published</option>
            <option value={"draft"}>Draft</option>
          </select>
          <input
            className="cursor-pointer inline-flex items-center rounded-full px-9 py-3 text-xl font-semibold text-pink-500 hover:text-white border-2 border-pink-500 hover:bg-pink-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-pink-500 duration-300 mt-8"
            type="submit"
          />
        </form>
      )}
    </>
  );
};

export default EventEditForm;
