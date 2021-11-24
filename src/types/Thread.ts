import { Message } from "./Message";
import { User } from "./User";

export type Thread = {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  messages: Array<Message>;
  lastUpdated: Date;
  creator?: User;
};
