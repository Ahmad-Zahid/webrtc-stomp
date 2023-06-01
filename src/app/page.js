"use client";

import React from "react";

import { BROKER_URL, CATALOG_REF_ID } from "./constants/settings";
import { useStompConnection } from "./hooks/useStompConnection";
import styles from "./page.module.css";

export default function Home() {
  const randomStr = "myRandomString";
  const topic = `/topic/messages/${CATALOG_REF_ID}-BC-${randomStr}`;

  const { messages } = useStompConnection({ brokerURL: BROKER_URL, topic });

  return (
    <main className={styles.main}>
      <div>
        <h1>Messages</h1>
        <ul className={styles.list}>
          {messages.map((message) => (
            <li key={crypto.randomUUID()} className={styles.listItem}>
              {message}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
