// api/menu.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api/menu";

export const getFullMenu = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const searchMenuItems = async (query: string) => {
  const response = await axios.get(`${API_URL}/search?query=${query}`);
  return response.data;
};
