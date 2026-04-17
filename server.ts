// import { createServer } from "http";
// import next from "next";
// import { Server } from "socket.io";

// declare global {
//   var io: Server | undefined;
// }

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handler = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer(handler);

//   const io = new Server(server, {
//     cors: { origin: "http://localhost:3000/*" },
//   });

//  if (!global.io) {
//    const io = new Server(server, {
//      cors: {
//        origin: "http://localhost:3000",
//        methods: ["GET", "POST"],
//      },
//    });

//    io.on("connection", (socket) => {
//      console.log("User connected:", socket.id);
//    });

//    global.io = io;
//  }

//   global.io = io; // make accessible

//   server.listen(3000, () => {
//     console.log("Server running on port 3000");
//   });
// });

import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { setIO } from "./lib/socket"; // 👈 import this

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(handler);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  });

  setIO(io); // 🔥 THIS is the key step

  server.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});


export default function ServerComponent() {
  return null;
}