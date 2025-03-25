// services/chatService.js
import Conversation from '../models/conversation.js';
import Message from '../models/message.js';

// export const getConversations = async (userId) => {
//   return Conversation.find({ participants: userId,lastMessage: { $exists: true, $ne: '' } })
//     .populate('participants', '-password')
//     .sort({ updatedAt: -1 });
// };

export const getConversations = async (userId) => {
  console.log("hereeee")
  return Conversation.find({
      'participants.userId': userId,
      lastMessage: { $exists: true, $ne: '' }
    })
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

export const getOrCreateConversation = async (participants) => {
  const participant1 = participants[0] 
  const participant2 = participants[1] 
  console.log(participant1,participant2)
  // Extract the user IDs from the participant objects
  const userIds = [participant1.userId, participant2.userId];

  // Find a conversation that has both participants and exactly 2 entries
  let conversation = await Conversation.findOne({
    'participants.userId': { $all: userIds },
    participants: { $size: 2 }
  });

  if (!conversation) {
    conversation = new Conversation({ participants: [participant1, participant2] });
    await conversation.save();
  }
  return conversation;
};


// export const getOrCreateConversation = async (user1, user2) => {
  
//     let conversation = await Conversation.findOne({
//       participants: { $all: [user1, user2], $size: 2 }
//     });
//     if (!conversation) {
//       conversation = new Conversation({ participants: [user1, user2] });
//       await conversation.save();
//     }
//     return conversation;
//   };

  // export const getOrCreateConversation = async (user1, user2) => {
  
  //   let conversation = await Conversation.findOne({
  //     participants: { $all: [user1, user2], $size: 2 }
  //   });
  //   if (!conversation) {
  //     conversation = new Conversation({ participants: [user1, user2] });
  //     await conversation.save();
  //   }
  //   return conversation;
  // };
