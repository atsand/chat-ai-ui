import { useChatStore } from '.';
import axios from 'axios';

interface ChatMessage {
  message: string;
  reply: string;
};

interface FormattedMessage {
  role: 'user' | 'ai';
  content: string;
};

export const actions = {
  aPiniaGetChatHistory(requestParams: object) {
    console.log('requestParams', requestParams)
    return new Promise<void|string>(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/get-messages`, requestParams);
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

  aPiniaSetChatHistory(data: Array<object>) {
    const CHAT_STORE = useChatStore();

    CHAT_STORE.$patch({
      chatHistory: data ?? []
    });
  }
};