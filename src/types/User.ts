import { Forum } from './Forum';
import { Role } from './Role';

export type User = {
  id: number;
  username: string;
  password: string; // sleppa pw hér?
  email: string;
  favouriteForums: Array<Forum>;
  userRole: Role;
}