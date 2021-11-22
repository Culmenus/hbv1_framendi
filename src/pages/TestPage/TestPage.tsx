import { Button, Container } from "@mui/material";
import { CompatClient, IMessage, Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Message } from "../../types/Message";
var stompClient: CompatClient | null = null;

export function TestPage() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const { threadID } = useParams();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  });
  function connect() {
    var socket = new SockJS("http://localhost:8080/thread", null, {});
    stompClient = Stomp.over(socket);
    stompClient.activate();
    stompClient.onConnect = function (frame) {
      console.log("Connected: " + frame);
      stompClient?.subscribe(`api/thread/${threadID}`, function (msg) {
        messages.push(JSON.parse(msg.body));
      });
    };
  }
  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  function sendMessage() {
    stompClient?.publish({
      destination: `api/thread/${threadID}/send`,
      body: "hello",
    });
  }

  return (
    <Container>
      <Button onClick={() => sendMessage()}>send message</Button>
      {messages.map((value) => {
        <p>{value.message}</p>;
      })}
    </Container>
  );
}
