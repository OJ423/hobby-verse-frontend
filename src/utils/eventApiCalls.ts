import axios from "axios";
import { EventEditInput } from "./customTypes";

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

export async function patchEvent(token: string | null, eventId: number, body:EventEditInput) {
  try {
    const response = await instance.patch(`events/edit/${eventId}`, body,{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data
  }
  catch(err) {
    console.log("Error fetching data", err)
    throw err
  }
}

// Get Categories

export async function getCategories() {
  try {
    const response = await instance.get("categories");
    return response.data;
  } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}


