import { Message } from '../../types/Message';

const MessageComponent: React.FC = () => { 

  let dude: Message = {
    id: 1,
    message: "asdf",
    isEdited: true,
  }
  return (
    <>
      {dude.id}
      {dude.message}
      {dude.isEdited+'\n'}
    </>
  );
}

export default MessageComponent;