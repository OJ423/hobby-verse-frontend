import axios from "axios";
import { LoginInputs, RegistrationInputs } from "./customTypes";

const instance = axios.create({
  baseURL: "http://localhost:9090/api/",
});

export async function registerUser(body:RegistrationInputs) {
  try {
    const response = await instance.post("users/register", body);
    return response.data;
  }
  catch(err) {
    console.log("Error fetching registration data", err)
    throw err
  }
}

export async function verifyNewUserAccount(token: string) {
  try {
    const response = await instance.get(`users/verify-email?token=${token}`)
    return response.data
  }
  catch (err) {
    console.log("Error validating new user", err)
    throw err
  }
}

export async function logUserIn(body: LoginInputs) {
  try {
    const response = await instance.post("users/login", body);
    return response.data;
  } catch (err) {
    console.error("error logging in:", err);
    throw err;
  }
}
