import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Thread as TThread } from "../../types/Thread";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Container, createStyles, TextField } from "@mui/material";
import MessageComponent from "../message/Message";
import { Message, MessageDto } from "../../types/Message";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../app/auth";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import Scrollbars from "react-custom-scrollbars-2";
import { usePostMessageMutation } from "../../app/services/backendConnection";
import { deepPurple } from "@mui/material/colors";

let stompClient: Client | null = null;
const styles = {
  input: {
    color: "white",
  },
};

export default function ThreadComponent({
  thread,
}: {
  thread: TThread | null;
}) {
  const [messages, setMessages] = useState<Array<MessageDto>>([]);
  useEffect(() => {
    if (thread) {
      setMessages(
        thread.messages.map((value) => {
          const dto: MessageDto = {
            userID: value.sentBy?.id,
            username: value.sentBy?.username,
            message: value.message,
            createdAt: value.createdAt,
            isEdited: value.isEdited,
          };
          return dto;
        })
      );
    }
  }, [thread]);
  console.log(messages);
  const [value, setValue] = useState<string>("");
  const user = useAppSelector(selectCurrentUser);
  const [postMessage] = usePostMessageMutation();
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [thread]);
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
    stompClient.onConnect = function (frame: any) {
      console.log("Connected");
      stompClient?.subscribe(
        `/thread/${id}/get`,
        function (msg: { body: string }) {
          setMessages((messages) => [...messages, JSON.parse(msg.body)]);
        }
      );
    };
    stompClient.onStompError = function (frame: {
      headers: { [x: string]: string };
      body: string;
    }) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };
  }
  function disconnect() {
    if (stompClient !== null) {
      stompClient.deactivate();
    }
    console.log("Disconnected");
  }

  function sendMessage() {
    const message: MessageDto = {
      message: value,
      isEdited: false,
      userID: user?.id || undefined,
      username: user?.username || undefined,
    };
    console.log(id);
    stompClient?.publish({
      destination: `/app/thread/${id}/send`,
      body: JSON.stringify(message),
    });
    postMessage({
      message: message,
      threadID: id?.toString() || "",
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
      padding={0}
    >
      <Container
        style={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          paddingBottom: "10px",
          marginTop: "auto",
          alignContent: "flex-end",
          padding: "5px",
          width: "100%",
          overflowX: "clip",
        }}
      >
        <List
          style={{
            flex: 1,
            alignContent: "flex-end",
          }}
        >
          {messages.map((value: MessageDto, index) => {
            return (
              <MessageComponent
                key={index.toString()}
                msg={value}
                myID={user?.id || null}
              />
            );
          })}
        </List>
      </Container>

      <TextField
        style={{ width: "100%" }}
        label="Skrifa skeyti"
        variant="standard"
        sx={{ color: "#fff" }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter" && value) {
            sendMessage();
          }
        }}
        // InputLabelProps={{ style: { color: deepPurple[500] } }}
        InputProps={{
          style: { color: "white" },
          endAdornment: <Button onClick={() => sendMessage()}>send</Button>,
        }}
      />
    </Box>
  );
}
