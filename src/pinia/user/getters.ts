import { useUserStore } from ".";
import type { User } from "../../types/types";

export const getters = {
  gPiniaUser: (): User => {
    const USER_STORE = useUserStore();

    return USER_STORE.user;
  }
};