import api from "./api";
import { getToken } from "./authService";

export const createComplaint = async (formData) => {
  const response = await api.post("/complaints", formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getMyComplaints = async () => {
  const response = await api.get("/complaints/my", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getComplaintById = async (id) => {
  const response = await api.get(`/complaints/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};