/* eslint-disable @typescript-eslint/no-explicit-any */
import apiUtils from "@/utils/api.utils";
const base = "archive";

export default {
  fetchAllProducts: async (filter: any) => {
    try {
      const queryString = Object.entries(filter)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
        )
        .join("&");

      const res = await apiUtils
        .privateAxios()
        .get(`/${base}/products?${queryString}`);
      return res.data;
    } catch (e) {
      return e;
    }
  },
  fetchAllService: async (filter: any) => {
    try {
      const queryString = Object.entries(filter)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
        )
        .join("&");

      const res = await apiUtils
        .privateAxios()
        .get(`/${base}/services?${queryString}`);

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
};
