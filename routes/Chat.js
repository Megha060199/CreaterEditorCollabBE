
import express from 'express';
import { getConversations, getMessages, createConversation, createMessage,getOrCreateConversation } from '../controllers/chatController.js';

const router = express.Router();
router.get('/conversations/:userId', getConversations);
router.get('/messages/:conversationId', getMessages);
router.post('/conversations', createConversation);

router.post('/messages', createMessage);
router.get('/conversation/:user1/:user2', getOrCreateConversation);
export default router;
