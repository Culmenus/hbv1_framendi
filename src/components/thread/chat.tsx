import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput";
import { MessageLeft, MessageRight } from "./MessageComponents";
import { LoremIpsum } from "lorem-ipsum";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "200%",
      height: "80vh",
      maxWidth: "1000px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      border: 'none'
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      width: "30vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    messagesBody: {
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
      border: 'none'
    }
  })
);
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
export function Chat() {
  const classes = useStyles();
  return (
      <Paper className={classes.paper} >
        <Paper className={classes.messagesBody}>
          <MessageLeft
            message={lorem.generateParagraphs(1)}
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Jonny boi"
            avatarDisp={true}
          />
          <MessageLeft
            message={lorem.generateParagraphs(1)}
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName="Jonny boi"
            avatarDisp={false}
          />
          <MessageRight
            message={lorem.generateParagraphs(1)}
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Oat meal"
            avatarDisp={true}
          />
          <MessageRight
            message={lorem.generateParagraphs(1)}
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Daniel weekend"
            avatarDisp={false}
          />
        </Paper>
        <TextInput />
      </Paper>
  );
}
