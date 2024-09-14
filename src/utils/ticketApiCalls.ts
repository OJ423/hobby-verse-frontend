import axios from "axios";
import { EventTicketInput, NewTicketInput, TicketInput } from "./customTypes";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
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

export async function getAllTickets(token: string | null) {
  try {
    const response = await instance.get(`tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      return response.data;

    } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}

export async function postTicket(token: string | null, body:NewTicketInput) {
  try {
    const response = await instance.post(`tickets/new`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      return response.data;

    } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}


export async function patchTicket(token: string | null, ticketId: number | undefined, body:TicketInput) {
  try {
    const response = await instance.patch(`tickets/edit/${ticketId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      return response.data;

    } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}

export async function deleteTicket(token: string | null, ticketId: number) {
  try {
    const response = await instance.delete(`tickets/delete/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      return response.data;

    } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}

// Event Tickets

export async function postEventTicket(token: string | null, body:EventTicketInput) {
  try {
    const response = await instance.post(`event-tickets/new`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      return response.data;

    } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}

export async function patchEventTicket(token: string | null, eventTicketId: number, body:EventTicketInput) {
  try {
    const response = await instance.patch(`event-tickets/edit/${eventTicketId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      return response.data;

    } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}

export async function deleteEventTicket(token: string | null, eventTicketId: number) {
  try {
    const response = await instance.delete(`event-tickets/delete/${eventTicketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      return response.data;

    } catch (err) {
    console.log("Error fetching event data", err);
    throw err;
  }
}