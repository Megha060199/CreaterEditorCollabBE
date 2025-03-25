
import * as chatService from '../services/chatService.js';

export const getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await chatService.getConversations(userId);
    res.json(conversations);
  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Error fetching conversations' });
  }
};

export const getMessages = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await chatService.getMessages(conversationId);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

export const createConversation = async (req, res) => {
  const { participants } = req.body; 

  try {
    const conversation = await chatService.createConversation(participants);
    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating conversation' });
  }
};

export const createMessage = async (req, res) => {
  const { conversationId, senderId, text, attachments } = req.body;
  try {
    const message = await chatService.createMessage({ conversationId, senderId, text, attachments });
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating message' });
  }
};

// export const getOrCreateConversation = async (req, res) => {
//     const { user1, user2 } = req.params;
//     try {
//       const conversation = await chatService.getOrCreateConversation(user1, user2);
      
//       res.json(conversation);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error fetching conversation' });
//     }
//   };

export const getOrCreateConversation = async (req, res) => {
  
  try {
    const conversation = await chatService.getOrCreateConversation(req.body.participants);
    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

