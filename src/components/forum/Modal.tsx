import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CreateThreadInput from "./CreateThreadInput";
import { Dispatch, SetStateAction } from "react";
import { Thread } from "../../types/Thread";
type Props = {
  setTitle: Dispatch<SetStateAction<string | undefined>>;
  setDescription: Dispatch<SetStateAction<string | undefined>>;
  creating: boolean;
  setCreating: Dispatch<SetStateAction<boolean>>;
  setEditing: Dispatch<SetStateAction<boolean>>;
  addThread: (thread: Thread) => void;
  title: string | undefined;
  description: string | undefined;
  thread: Thread | null,
  editing: boolean,
  updateThread: Function,
};
export default function CreateThread({
  setTitle,
  setDescription,
  setCreating,
  setEditing,
  creating,
  addThread,
  title,
  description,
  thread,
  editing,
  updateThread,
}: Props) {
  const handleOpen = () => {
    setCreating(true);
  };
  const handleClose = () => {
    setCreating(false);
  };

  return (
    <Modal
      open={creating || editing}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          display: "flex",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "gray",
          border: "2px solid #000",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <h2 id="parent-modal-title">{
          editing ? `Editing ${thread?.title}` : "Create new thread" }</h2>
        <CreateThreadInput
          setTitle={setTitle}
          setDescription={setDescription}
          setCreating={setCreating}
          setEditing={setEditing}
          addThread={addThread}
          title={title}
          description={description}
          threadToEdit={thread}
          editing={editing}
          updateThread={updateThread}
        />
      </Box>
    </Modal>
  );
}
