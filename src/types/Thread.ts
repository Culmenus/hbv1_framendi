import { Message } from './Message';

export type Thread = {
  id: number;
  title: string;
  description: string;
  messages: Array<Message>;
  lastUpdated: Date;
}