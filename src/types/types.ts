export interface ChatMessage {
  message: string;
  reply: string;
};

export interface FormattedMessage {
  content: string;
  role: 'user' | 'ai';
};

export interface User {
  email: string;
  name: string;
  userId: string;
};