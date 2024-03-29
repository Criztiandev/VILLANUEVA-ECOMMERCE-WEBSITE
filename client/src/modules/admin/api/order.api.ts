/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderModel } from "@/interface/model";
import apiUtils from "@/utils/api.utils";
const base = "orders";

export default {
  create: async (payload: OrderModel) =>
    await apiUtils.privateAxios().post(`/${base}/create`, payload),

  fetchAll: async () => {
    try {
      const res = await apiUtils.privateAxios().get(`/${base}`);
      console.log(res.data);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  fetchAllReturned: async () => {
    try {
      console.log("fetching all returned orders");

      const res = await apiUtils.privateAxios().get(`/${base}/returned`);
      console.log(res.data);
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

  updateById: async (UID: string, payload: any) =>
    await apiUtils.privateAxios().put(`${base}/${UID}`, payload),

  deleteById: async (id: string) => {
    const currentId = JSON.parse(localStorage.getItem("info") || "");
    if (id === currentId) {
      throw new Error("You cant Perform this Action");
    }
    return await apiUtils.privateAxios().delete(`/${base}/${id}`);
  },

  deleteByBatch: async (batchID: Array<string>) => {
    return await apiUtils.privateAxios().post(`/${base}/batch`, {
      payload: batchID,
    });
  },

  returnProducts: async (productID: string) => {
    return await apiUtils.privateAxios().delete(`/${base}/return/${productID}`);
  },
};
