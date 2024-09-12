import axios from "axios";
import { EditUser, LoginInputs, NewAdminUser, RegistrationInputs } from "./customTypes";

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

export async function patchUser(token: string | null, userId: number | undefined, body: EditUser) {
  try {
    const response = await instance.patch(`users/edit/${userId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  }
  catch(err) {
    console.log("error adding new Admin user", err)
    throw err
  }
} 

export async function deleteUser(token: string | null, userId: number | undefined) {
  try {
    const response = await instance.delete(`users/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  }
  catch(err) {
    console.log("error deleting user", err)
    throw err
  }
} 

// Admin & Staff Management

export async function getAllAdminStaff(token: string | null ) {
  try {
    const response = await instance.get("users/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  }
  catch(err) {
    console.log("error getting admin and staff", err)
    throw err
  }
}

export async function patchAdminUser(token: string | null, body: NewAdminUser) {
  try {
    const response = await instance.patch("users/admin", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  }
  catch(err) {
    console.log("error adding new Admin user", err)
    throw err
  }
} 


