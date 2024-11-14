import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes';
import missileRoutes from './routes/missileRoutes';
import Missile from './models/Missile'; 
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

// הגדרת ראוטים
app.use('/api/auth', authRoutes);
app.use('/api/missiles', missileRoutes); 

io.on('connection', async (socket) => {
  console.log('New client connected');

  // שליחת רשימת טילים לכל לקוח שמתחבר
  try {
    const missiles = await Missile.find(); 
    socket.emit('missilesData', missiles); 
  } catch (error) {
    console.error('Error fetching missiles data:', error);
  }

  // שיגור טיל
  socket.on('launchRocket', (data) => {
    io.emit('rocketLaunched', data); 
    console.log('Rocket launched:', data);
  });

  // יירוט טיל
  socket.on('interceptRocket', (data) => {
    io.emit('rocketIntercepted', data); 
    console.log('Rocket intercepted:', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
