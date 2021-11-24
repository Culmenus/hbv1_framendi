import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CreateThreadInput from './CreateThreadInput';
import { Dispatch, SetStateAction } from 'react';
import { Thread } from '../../types/Thread';


export default function CreateThread({
  setTitle, setDescription, setCreating, addThread, title, description
}: {
  setTitle: Dispatch<SetStateAction<string | undefined>>,
  setDescription: Dispatch<SetStateAction<string | undefined>>,
  setCreating: Dispatch<SetStateAction<boolean>>,
  addThread: (thread: Thread) => void,
  title: (string | undefined),
  description: (string | undefined)
}) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCreating(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{
              position: 'absolute' as 'absolute',
              display: 'flex',
              flexDirection: 'column',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'gray',
              border: '2px solid #000',
              boxShadow: 24,
              pt: 2,
              px: 4,
              pb: 3,
            }}>
          <h2 id="parent-modal-title">Create new thread</h2>
          <CreateThreadInput 
          setTitle = {setTitle}
          setDescription = {setDescription}
          setCreating = {setCreating}
          addThread = {addThread}
          setOpen = {setOpen}
          title = {title}
          description = {description}/>
          
        </Box>
      </Modal>
    </div>
  );
}