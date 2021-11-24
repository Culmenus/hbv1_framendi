import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Thread as TThread } from "../../types/Thread";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Container, createStyles, TextField } from "@mui/material";
import MessageComponent from "../message/Message";
import { Message, MessageDto } from "../../types/Message";
import { FakeMessages } from "../../pages/HomePage/fakecontent";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../app/auth";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient: Client | null = null;
const useStyles = makeStyles(() => ({
  dialog: {
    width: "48%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function ThreadComponent({
  thread,
}: {
  thread: TThread | null;
}) {
  const classes = useStyles();
  const [messages, setMessages] = useState<Array<MessageDto>>([]);
  const [value, setValue] = useState<string>("");
  const user = useAppSelector(selectCurrentUser);
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);
  if (!thread) {
    return <div></div>;
  }
  const { id } = thread;
  function connect() {
    stompClient = new Client({
      webSocketFactory: function socketFactor() {
        return new SockJS("http://127.0.0.1:8080/thread/");
      },
    });
    stompClient.activate();
    stompClient.onConnect = function (frame) {
      console.log("Connected");
      stompClient?.subscribe(`/thread/${id}/get`, function (msg) {
        setMessages((messages) => [...messages, JSON.parse(msg.body)]);
      });
    };
    stompClient.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };
  }
  console.log(messages);
  function disconnect() {
    if (stompClient !== null) {
      stompClient.deactivate();
    }
    console.log("Disconnected");
  }

  function sendMessage() {
    const message = {
      message: value,
      isEdited: false,
      userID: user?.id || null,
      username: user?.username || null,
    };
    stompClient?.publish({
      destination: `/app/thread/${id}/send`,
      body: JSON.stringify(message),
    });
    setValue("");
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height="100%"
      maxHeight="75vh"
    >
      <Container
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          paddingBottom: "10px",
          marginTop: "auto",
          alignContent: "flex-end",
        }}
      >
        <List style={{ flex: 1, alignContent: "flex-end" }}>
          {messages.map((value: MessageDto) => {
            return <MessageComponent msg={value} />;
          })}
        </List>
      </Container>
      <TextField
        style={{ width: "100%" }}
        label="Skrifa skeyti"
        variant="standard"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter" && value) {
            sendMessage();
          }
        }}
        InputProps={{
          endAdornment: <Button onClick={() => sendMessage()}>send</Button>,
        }}
      />
    </Box>
  );
}
