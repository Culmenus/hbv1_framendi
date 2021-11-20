import { Thread } from './Thread';

export type Forum = {
  id: number;
  courseId: string;
  name: string;
  description: string;
  threads: Array<Thread>;
}