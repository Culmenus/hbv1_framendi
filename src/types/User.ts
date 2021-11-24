import { Forum } from "./Forum";
import { Role } from "./Role";

export type User = {
  id: number;
  username: string;
  password: string; // sleppa pw hér?
  email: string;
  favoriteForums: Array<Forum>;
  userRole: Role;
};
