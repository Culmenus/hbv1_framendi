import React from 'react'
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { Dispatch, SetStateAction } from 'react';
import { Thread, Thread as TThread } from "../../types/Thread";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%",
        marginRight: '10px',
    },
    button: {
        //margin: theme.spacing(1),
        marginTop: '1em',
    },
  })
);


const CreateThreadInput = ({
  setTitle, setDescription, setCreating, addThread,setOpen, title, description
}: {
  setTitle: Dispatch<SetStateAction<string | undefined>>,
  setDescription: Dispatch<SetStateAction<string | undefined>>,
  setCreating: Dispatch<SetStateAction<boolean>>,
  addThread: (thread: Thread) => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  title: (string | undefined),
  description: (string | undefined)
}) => {
    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm}  noValidate autoComplete="off">
            <Box>
              <TextField
                  id="thread-title"
                  label="Thread title"
                  className={classes.wrapText}
                  margin="normal"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
              />
              <TextField
                  id="thread-description"
                  label="Thread description"
                  className={classes.wrapText}
                  margin="normal"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
              />  
                <Button variant="contained" color="primary" className={classes.button} 
                  onClick={() => {
                    let thr: TThread = {
                      id: undefined,
                      title: title,
                      description: description,
                      messages: [],
                      lastUpdated: new Date(),
                      user: undefined
                  }
                  addThread(thr);
                  setCreating(false);
                  setOpen(false);
                  }}>
                  Confirm
                </Button>
            </Box>
            </form>
        </>
    )
}

export default CreateThreadInput;



