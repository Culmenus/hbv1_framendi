import React from 'react';
import Thread from '../thread/Thread'
import { useParams } from 'react-router-dom';
import ThreadComponent from '../thread/Thread';

const ForumComponent: React.FC = () => {

  const { id } = useParams();

  // fetcha á id með useState væntanlega
  // fa Threads til baka

  return (
    <>
      {id}
      <ThreadComponent/>
      <ThreadComponent/>
      <ThreadComponent/>
    </>
  );
}

export default ForumComponent;