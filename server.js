import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { evaluatePosture } from './services/postureRules.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.get('/', (_, res) => res.send('Backend is live'));

io.on('connection', socket => {
  console.log('Client connected');

  socket.on('frame', ({ keypoints, mode }) => {
    const result = evaluatePosture(keypoints, mode);
    socket.emit('posture-feedback', result);
  });

  socket.on('start-detection', () => console.log('Detection started by client'));
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
