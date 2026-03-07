import express from 'express';
import { getMessages } from '../controllers/chatController.js';

const router = express.Router();

// GET /api/chats/messages — Returns last 50 messages (for page load)
router.get('/messages', getMessages);

export default router;
