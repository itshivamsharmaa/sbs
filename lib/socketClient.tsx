"use client";

import { io } from "socket.io-client";
import { useEffect } from "react";

export default function TestSocket() {
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}
