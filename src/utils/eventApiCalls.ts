import axios from "axios";
import { EventAddInput, EventEditInput } from "./customTypes";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

export async function getEvents(category: string | null, status: string) {
  try {
    const response = await instance.get("events", {
      params: {
        category,
        status,
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

export async function postEvent(token: string | null, body:EventAddInput) {
  try {
    const response = await instance.post(`events/new`, body,{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });
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
    return response.data
  }
  catch(err) {
    console.log("Error fetching data", err)
    throw err
  }
}

export async function deleteEvent(token: string | null, eventId: number) {
  try {
    const response = await instance.delete(`events/delete/${eventId}`, {
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });
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


