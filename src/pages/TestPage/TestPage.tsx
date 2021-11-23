import {
  Box,
  Button,
  Container,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { CompatClient, IMessage, Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { selectCurrentUser } from "../../app/auth";
import { useAppSelector } from "../../app/hooks";
import MessageComponent from "../../components/message/Message";
import { Message } from "../../types/Message";
var stompClient: Client | null = null;

export function TestPage() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [value, setValue] = useState<string>("");
  const user = useAppSelector(selectCurrentUser);
  const { id } = useParams();
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);
  function connect() {
    stompClient = new Client({
      webSocketFactory: function socketFactor() {
        return new SockJS("http://127.0.0.1:8080/thread/");
      },
    });

    stompClient.activate();
    stompClient.onConnect = function (frame) {
      stompClient?.subscribe(`/topic/get`, function (msg) {
        setMessages([...messages, JSON.parse(msg.body)]);
      });
    };
    stompClient.onStompError = function (frame) {
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
    const message: Message = {
      sentBy: user ?? undefined,
      message: value,
      isEdited: false,
    };
    stompClient?.publish({
      destination: `/app/send`,
      body: JSON.stringify(message),
    });
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height="100%"
      maxHeight="90vh"
    >
      <Container
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          height: "90vh",
          paddingBottom: "10px",
          marginTop: "auto",
          alignContent: "flex-end",
        }}
      >
        <List style={{ flex: 1, alignContent: "flex-end" }}>
          {messages.map((value) => {
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
        InputProps={{
          endAdornment: <Button onClick={() => sendMessage()}>send</Button>,
        }}
      />
    </Box>
  );
}
