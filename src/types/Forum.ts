import { Thread } from './Thread';

export type Forum = {
  id: number;
  coueseId: string;
  name: string;
  description: string;
  threads: Array<Thread>;
}