import { useUserStore } from ".";
import axios from 'axios';

export const actions = {
  aPiniaLogin(requestParams: object) {
    return new Promise<void|String>(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/register-user`, requestParams);

        this.aPiniaSetUser(data);
        resolve();
      } catch (error) {
        reject('Something went wrong, please try again');
      }
    })
  },

  aPiniaLogout() {
    const USER_STORE = useUserStore();
    
    USER_STORE.$patch({
      user: {}
    })
  },

  aPiniaSetUser(data: object) {
    const USER_STORE = useUserStore();

    USER_STORE.$patch({
      user: data
    });
  }
};