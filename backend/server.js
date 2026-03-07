import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import dotenv from 'dotenv';
import Message from './models/Message.js';

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Create HTTP server from Express app
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket.IO — real-time chat events
io.on('connection', (socket) => {
  console.log(`[Socket] User connected: ${socket.id}`);

  // Client sends a chat message
  socket.on('send_message', async (data) => {
    const { sender, text } = data;

    if (!sender || !text || text.trim() === '') return;

    try {
      // Persist to MongoDB
      const message = await Message.create({ sender: sender.trim(), text: text.trim() });

      // Broadcast to ALL connected clients (including sender)
      io.emit('receive_message', {
        _id: message._id,
        sender: message.sender,
        text: message.text,
        createdAt: message.createdAt,
      });
    } catch (error) {
      console.error('[Socket] Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
