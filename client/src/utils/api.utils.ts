/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerErrorResponse } from "@/interface/server";
import { AxiosError } from "axios";
import axios, { AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Replace with your API base URL
const BASE_IMG = import.meta.env.VITE_BASE_IMAGE_URL;

export default {
  sendFileAxios: () => {
    const instance: AxiosInstance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return instance;
  },

  privateAxios: () => {
    const instance: AxiosInstance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return instance;
  },

  publicAxios: () => {
    const instance: AxiosInstance = axios.create({
      baseURL: BASE_URL,
    });

    return instance;
  },

  imageAxios: () => {
    const instance: AxiosInstance = axios.create({
      baseURL: BASE_IMG,
      withCredentials: true,
      // header for image display
      headers: {
        Accept: "image/*",
      },
      responseType: "arraybuffer",
    });
    return instance;
  },

  errorHandler: (error: AxiosError<ServerErrorResponse>) => {
    if (error?.response) {
      const payload = error?.response;
      if (payload) {
        return {
          message: payload.data.message,
          status: payload.status,
        };
      }
    }

    return error?.message;
  },
};
