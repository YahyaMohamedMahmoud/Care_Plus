import express from "express";
import { createServer } from "http";
import { Server } from "socket.io"; // Importing Server from socket.io
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS to allow cross-origin requests

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

// Listen for new connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for incoming messages from the client
  socket.on("sendMessage", (messageData) => {
    console.log("Message received:", messageData);
    // Broadcast the message to all clients
    io.emit("receiveMessage", messageData);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
