import { Message } from './Message';
import { User } from './User';

export type Thread = {
  id: number;
  title: string;
  description: string;
  messages: Array<Message>;
  lastUpdated: Date;
  user: User;
}