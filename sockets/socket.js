
import { Server } from 'socket.io';
import Message from '../models/message.js';
import Conversation from '../models/conversation.js'

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);


    socket.on('joinConversation', (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
    });

 
    socket.on('leaveConversation', (conversationId) => {
      socket.leave(conversationId);
      console.log(`Socket ${socket.id} left conversation ${conversationId}`);
    });

    
    socket.on('sendMessage', async (data) => {
      const { conversationId, senderId, text, attachments } = data;
      try {
     
        const message = new Message({ conversationId, senderId, text, attachments });
        await message.save();


        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: text,
          updatedAt: Date.now()
        });

        io.to(conversationId).emit('newMessage', message);
      } catch (err) {
        console.error('Error sending message:', err);
        socket.emit('errorMessage', 'Error sending message');
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
