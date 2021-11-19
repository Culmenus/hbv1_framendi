import React from 'react';
import Thread from '../thread/Thread'

// hafa svona dudda i sér skrám
interface User {
  blabla: string;
}

// importa svona dudda :)
interface Props {
  daemi?: string;
  um?: boolean;
  props?: string;
  i?: number;
  fn?: (bob: string) => void;
  user?: User;
}

const Forum: React.FC<Props> = () => {
  //idno something like this? skoðum betur samhengi
  return (
    <div>
      <Thread/>
      <Thread/>
      <Thread/>
    </div>
  );
}

export default Forum;