//app.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http'; 
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes';
import { loadInitialData } from './services/dataLoader';

dotenv.config();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, { cors: { origin: '*' } }); 

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI!, {})
  .then(async () => {
    console.log('Connected to MongoDB');
    await loadInitialData();
  })
  .catch(error => console.error('MongoDB connection error:', error));

app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  // שידור של שיגור טיל
  socket.on('launchRocket', (data) => {
    io.emit('rocketLaunched', data); 
  });

  // שידור של יירוט טיל
  socket.on('interceptRocket', (data) => {
    io.emit('rocketIntercepted', data); 
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
