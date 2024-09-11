import axios from "axios";
import { OrderInput } from "./customTypes";

const instance = axios.create({
  baseURL: "http://localhost:9090/api/",
});

export async function postNewOrder(token: string | null, body: OrderInput) {
  try {
    const response = await instance.post("orders/new", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error fetching registration data", err);
    throw err;
  }
}

export async function getOrder(token: string | null, orderId:string) {
  try {
    const response = await instance.get(`orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error fetching registration data", err);
    throw err;
  }
}

export async function getOrders(token: string | null) {
  try {
    const response = await instance.get(`orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error fetching registration data", err);
    throw err;
  }
}

export async function getOrdersByUser(token: string | null) {
  try {
    const response = await instance.get(`orders/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error fetching registration data", err);
    throw err;
  }
}
