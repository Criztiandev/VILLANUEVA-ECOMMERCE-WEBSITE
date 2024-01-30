/* eslint-disable @typescript-eslint/no-explicit-any */
import apiUtils from "@/utils/api.utils";
const base = "archive";

export default {
  fetchAll: async () => {
    try {
      const res = await apiUtils.privateAxios().get(`/${base}/products`);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  fetchById: async (UID: string) => {
    try {
      const res = await apiUtils.privateAxios().get(`/${base}/products/${UID}`);
      return res.data;
    } catch (e) {
      return e;
    }
  },
};
