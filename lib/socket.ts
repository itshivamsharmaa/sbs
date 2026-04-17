// lib/socket.ts
import { Server } from "socket.io";

let io: Server;

export function setIO(serverIO: Server) {
  io = serverIO;
  console.log("Socket.io instance set", io);
}

export function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}
