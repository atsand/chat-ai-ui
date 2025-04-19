import { defineStore } from "pinia";
import { actions } from './actions';
import { getters } from './getters';
import { state } from './state';

export const useChatStore = defineStore('chat', {
  actions,
  getters,
  state: () => ({ ...state }),
  persist: true // Keep state upon page reloads
});