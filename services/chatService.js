// services/chatService.js
import Conversation from '../models/conversation.js';
import Message from '../models/message.js';

export const getConversations = async (userId) => {
  return Conversation.find({ participants: userId })
    .populate('participants', '-password')
    .sort({ updatedAt: -1 });
};

export const getMessages = async (conversationId) => {
  return Message.find({ conversationId }).sort({ createdAt: 1 });
};

export const createConversation = async (participants) => {
  const conversation = new Conversation({ participants });
  await conversation.save();
  return conversation;
};

export const createMessage = async ({ conversationId, senderId, text, attachments }) => {
  const message = new Message({ conversationId, senderId, text, attachments });
  await message.save();
  await Conversation.findByIdAndUpdate(conversationId, { lastMessage: text, updatedAt: Date.now() });
  return message;
};

export const getOrCreateConversation = async (user1, user2) => {
    let conversation = await Conversation.findOne({
      participants: { $all: [user1, user2], $size: 2 }
    });
    if (!conversation) {
      conversation = new Conversation({ participants: [user1, user2] });
      await conversation.save();
    }
    return conversation;
  };
