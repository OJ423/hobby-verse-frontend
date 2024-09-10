import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9090/api/",
});

export async function getEvents(category: string | null) {
  try {
    const response = await instance.get("events", {
      params: {
        category,
      }});

      return response.data;

    } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}

export async function getEvent(categoryId: string | null) {
  try {
    const response = await instance.get(`events/${categoryId}`);
    return response.data
  }
  catch(err) {
    console.log("Error fetching data", err)
    throw err
  }
}

export async function getCategories() {
  try {
    const response = await instance.get("categories");
    return response.data;
  } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}
