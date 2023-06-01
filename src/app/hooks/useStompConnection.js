"use client";

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

export const useStompConnection = ({ brokerURL, topic }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const onMessageReceived = (message) => {
      setMessages((prev) => [...prev, message.body]);
    };

    const client = new Client();

    client.configure({
      brokerURL,
      onConnect: () => {
        client.subscribe(topic, onMessageReceived, { ack: "client" });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [brokerURL, topic]);

  return { messages };
};
