"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useNotificationStore } from "@/lib/zustandStore/notification";

export default function SocketListener() {
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("booking:created", (data) => {
      addNotification({
        id: crypto.randomUUID(),
        message: `New booking from ${data.name}`,
        createdAt: new Date(),
        read: false,
      });
    });

    return () => {
      socket.disconnect();
    }
  }, [addNotification]);

  return null;
}
