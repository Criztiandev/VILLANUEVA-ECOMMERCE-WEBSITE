/* eslint-disable @typescript-eslint/no-explicit-any */
import apiUtils from "@/utils/api.utils";
const base = "products";

export default {
  fetchAll: async () => {
    try {
      const res = await apiUtils.privateAxios().get(`/${base}`);
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
};
