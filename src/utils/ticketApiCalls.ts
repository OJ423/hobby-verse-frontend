import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9090/api/",
});

export async function getEventTickets(eventId: string) {
  try {
    const response = await instance.get(`event-tickets/${eventId}`);

      return response.data;

    } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}