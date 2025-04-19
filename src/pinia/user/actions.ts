import { useUserStore } from ".";

export const actions = {
  logout() {
    const USER_STORE = useUserStore();
    
    USER_STORE.$patch({
      user: {}
    })
  },

  setUser(data: Object) {
    const USER_STORE = useUserStore();

    USER_STORE.$patch({
      user: data
    });
  }
};