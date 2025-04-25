import { useChatStore } from ".";
import type { FormattedMessage } from "../../types/types";

export const getters = {
  gPiniaChatHistory: (): FormattedMessage[] => {
    const CHAT_STORE = useChatStore();

    return Array.isArray(CHAT_STORE.chatHistory) ? CHAT_STORE.chatHistory : [];
  }
};