
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import { loadInitialData } from './utils/loadInitialData';

dotenv.config(); 
const app = express();

connectDB(); 
app.use(express.json()); 

app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // טעינת נתוני התחלה
  await loadInitialData(); 
});
