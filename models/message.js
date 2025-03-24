
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  conversationId: { type: String, ref: 'Conversation' },
  senderId: { type: String }, 
  text: String,
  attachments: [String],
  createdAt: { type: Date, default: Date.now },
  readBy: [{ type: String }],
});

export default mongoose.model('Message', MessageSchema);
