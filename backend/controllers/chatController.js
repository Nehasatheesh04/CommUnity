import Message from '../models/Message.js';

// GET /api/chats/messages — Fetch last 50 messages for initial page load
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(50);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Error fetching messages.' });
  }
};
