import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import authRoutes from './routes/authRoutes';
import { loadInitialData } from './services/dataLoader';

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173/', // הכתובת שבה רץ ה-Frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));




mongoose
  .connect(process.env.MONGO_URI!, { })
  .then(async () => {
    console.log('Connected to MongoDB');
    await loadInitialData(); // טוען נתוני התחלה
  })
  .catch(error => console.error('MongoDB connection error:', error));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
