import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Dispatch, SetStateAction } from "react";
import { Thread, Thread as TThread } from "../../types/Thread";
import { ScopedCssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "../../pages/PageMisc";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../app/auth";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`,
    },
    wrapText: {
      width: "100%",
      marginRight: "10px",
    },
    button: {
      //margin: theme.spacing(1),
      marginTop: "1em",
    },
  })
);

const CreateThreadInput = ({
  setTitle,
  setDescription,
  setCreating,
  setEditing,
  addThread,
  title,
  description,
  threadToEdit,
  editing,
  updateThread,
}: {
  setTitle: Dispatch<SetStateAction<string | undefined>>;
  setDescription: Dispatch<SetStateAction<string | undefined>>;
  setCreating: Dispatch<SetStateAction<boolean>>;
  setEditing: Dispatch<SetStateAction<boolean>>;
  addThread: (thread: Thread) => void;
  title: string | undefined;
  description: string | undefined;
  threadToEdit: Thread | null;
  editing: boolean,
  updateThread: Function,
}) => {
  const classes = useStyles(darkTheme);
  const user = useAppSelector(selectCurrentUser);

  return (
    <div>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <ThemeProvider theme={darkTheme}>
          <ScopedCssBaseline />
          <Box>
            <TextField
              variant="filled"
              label="Thread title"
              // className={classes.wrapText}
              style={{ width: "90%" }}
              margin="normal"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              variant="filled"
              label="Thread description"
              // className={classes.wrapText}
              style={{ width: "90%" }}
              margin="normal"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                let thr: TThread = {
                  id: undefined,
                  title: title,
                  description: description,
                  messages: editing && threadToEdit?.messages? threadToEdit?.messages : [],
                  lastUpdated: new Date(),
                  creator: user ?? undefined,
                };

                //update thread if edit

                if(editing && threadToEdit){
                  updateThread({thread: thr, threadId: threadToEdit.id})
                }else{
                  addThread(thr);
                }
                setCreating(false);
                setEditing(false);
              }}
            >
              Confirm
            </Button>
          </Box>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default CreateThreadInput;
