import axios from "axios";

const API = axios.create({
  baseURL: "https://mediconnect-0s2t.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getDoctors = () => API.get("/doctors/");
export const addDoctor = (data) => API.post("/doctors/add", data);
export const bookAppointment = (data) => API.post("/appointments/book", data);
export const getMyAppointments = () => API.get("/appointments/my");
export const cancelAppointment = (id) => API.delete(`/appointments/cancel/${id}`);
export const getAllAppointments = () => API.get("/appointments/all");
export const rateAppointment = (id, rating) => API.post(`/appointments/rate/${id}`, { rating });
