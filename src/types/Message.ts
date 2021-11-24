import { User } from "./User";

export type Message = {
  id?: number;
  sentBy?: User;
  message: string;
  createdAt?: Date;
  isEdited: boolean;
};

export type MessageDto = {
  userID?: number;
  username?: string;
  message: string;
  createdAt?: Date;
  isEdited: boolean;
};
