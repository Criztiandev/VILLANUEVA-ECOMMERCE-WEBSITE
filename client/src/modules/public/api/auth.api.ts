/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/interface/user";
import apiUtils from "@/utils/api.utils";

const BASE_ROUTE: string = "auth";
export default {
  login: async (payload: any) =>
    await apiUtils.privateAxios().post(`/${BASE_ROUTE}`, payload),

  register: async (payload: User) =>
    await apiUtils.publicAxios().post(`/${BASE_ROUTE}/register`, payload),
};
