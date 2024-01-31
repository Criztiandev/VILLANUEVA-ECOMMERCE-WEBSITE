/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageModel } from "@/interface/model";
import apiUtils from "@/utils/api.utils";
const base = "message";

export default {
  create: async (payload: MessageModel) =>
    await apiUtils.privateAxios().post(`/${base}/create`, payload),

  fetchAll: async (filter: any) => {
    try {
      const queryString = Object.entries(filter)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
        )
        .join("&");

      const res = await apiUtils.privateAxios().get(`/${base}?${queryString}`);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  fetchById: async (UID: string) => {
    try {
      const res = await apiUtils.privateAxios().get(`/${base}/${UID}`);
      return res.data;
    } catch (e) {
      return e;
    }
  },
  fetchByIdFromUser: async (UID: string) => {
    try {
      const res = await apiUtils.privateAxios().get(`/${base}/${UID}`);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  updateById: async (UID: string, payload: any) =>
    await apiUtils.privateAxios().put(`${base}/${UID}`, payload),

  deleteById: async (id: string) => {
    const currentId = JSON.parse(localStorage.getItem("info") || "");
    if (id === currentId) {
      throw new Error("You cant Perform this Action");
    }
    return await apiUtils.privateAxios().delete(`/${base}/${id}`);
  },

  deleteByFilter: async (filter: any) => {
    try {
      const queryString = Object.entries(filter)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
        )
        .join("&");

      const res = await apiUtils
        .privateAxios()
        .post(`/${base}/filter?${queryString}`);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  deleteByBatch: async (batchID: Array<string>) => {
    return await apiUtils.privateAxios().post(`/${base}/batch`, {
      payload: batchID,
    });
  },
};
