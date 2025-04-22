import { useChatStore } from ".";

export const getters = {
  gPiniaChatHistory: (): Array<object> => {
    const CHAT_STORE = useChatStore();

    return Array.isArray(CHAT_STORE.chatHistory) ? CHAT_STORE.chatHistory : [];
  }
};