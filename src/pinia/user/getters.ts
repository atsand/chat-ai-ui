import { useUserStore } from ".";
import type { User } from "../../types/types";
import { isObjectPlain } from "../../utils/utils";

export const getters = {
  gPiniaUser: (): User | {} => {
    const USER_STORE = useUserStore();

    return isObjectPlain(USER_STORE.user) ? USER_STORE.user : {};
  }
};