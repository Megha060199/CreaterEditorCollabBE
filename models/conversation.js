
import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
  participants: [{ type: String }], 
  lastMessage: String,
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Conversation', ConversationSchema);
