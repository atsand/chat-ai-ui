import { useUserStore } from ".";
import { isObjectPlain } from "../../utils/utils";

export const getters = {
  gPiniaUser: (): object => {
    const USER_STORE = useUserStore();

    return isObjectPlain(USER_STORE.user) ? USER_STORE.user : {};
  }
};