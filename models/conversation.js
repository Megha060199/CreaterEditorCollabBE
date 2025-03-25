
import mongoose from 'mongoose';


const ParticipantSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  avatar: String,
}, { _id: false });

const ConversationSchema = new mongoose.Schema({
  participants: [ParticipantSchema],
  lastMessage: String,
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Conversation', ConversationSchema);

// const ConversationSchema = new mongoose.Schema({
//   participants: [{ type: String }], 
//   lastMessage: String,
//   updatedAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Conversation', ConversationSchema);
