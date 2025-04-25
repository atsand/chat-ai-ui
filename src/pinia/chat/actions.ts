import { useChatStore } from '.';
import { useUserStore } from '../user';
import type { ChatMessage, FormattedMessage } from '../../types/types';
import axios from 'axios';

export const actions = {
  aPiniaGetChatHistory(requestParams: object) {
    return new Promise<void|string>(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/get-messages`, requestParams);
        console.log('in data', data)
        const FORMATTED_MESSAGES = data.messages?.flatMap((msg: ChatMessage): FormattedMessage[] => {
          return [
            {
              role: 'user',
              content: msg.message
            },
            {
              role: 'ai',
              content: msg.reply
            }
          ]
        }).filter((msg: FormattedMessage) => msg.content);

        this.aPiniaSetChatHistory(FORMATTED_MESSAGES);
        resolve();
      } catch (error) {
        reject('Error getting chat history');
      }
    })
  },

  aPiniaSendMessage(message: string) {
    const { gPiniaUser } = useUserStore();
    const CHAT_STORE = useChatStore();

    return new Promise<void>(async (resolve, reject) => {
      try {
        const REQUEST_PARAMS = {
          message,
          userId: gPiniaUser?.userId
        };
        const USER_MESSAGE: FormattedMessage = {
          content: message,
          role: 'user'
        };
        const AI_MESSAGE: FormattedMessage = {
          content: '',
          role: 'ai'
        };

        CHAT_STORE.$patch({
          chatHistory: [...CHAT_STORE.gPiniaChatHistory, USER_MESSAGE]
        });
        
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, REQUEST_PARAMS);

        AI_MESSAGE.content = data.reply;

        CHAT_STORE.$patch({
          chatHistory: [...CHAT_STORE.gPiniaChatHistory, AI_MESSAGE]
        });

        resolve();
      } catch (error) {
        reject('Error contacting chat. Please try again.');
      }
    })
  },

  aPiniaSetChatHistory(data: Array<object>) {
    const CHAT_STORE = useChatStore();

    CHAT_STORE.$patch({
      chatHistory: data ?? []
    });
  }
};