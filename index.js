import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import './db.js'
// import { Server } from 'socket.io';
// import Conversation from './models/conversation.js';
// import Message from './models/message.js';
// import axios from 'axios';
import editorsRoute  from './routes/contentEditor.js'
import projectsRoute from './routes/projects.js'
import chatRoutes from './routes/Chat.js';
import videoRoutes from './routes/video.js';
import { initializeSocket } from './sockets/socket.js';
const app = express();
const PORT = process.env.PORT 

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => res.send('✅ Server running'));
app.use('/editorListings',editorsRoute)
app.use('/projects',projectsRoute)
app.use('/chat', chatRoutes);
app.use('/video', videoRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});
const httpServer = http.createServer(app);
initializeSocket(httpServer);

httpServer.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
