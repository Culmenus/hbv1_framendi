import { Message } from './Message';

export type Thread = {
  id?: number;
  title: string | undefined;
  description: string | undefined;
  messages: Array<Message>;
  lastUpdated: Date;
}