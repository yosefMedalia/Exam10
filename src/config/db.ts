import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {

        });
    console.log('MongoDB connected יאללה שוט');
  } catch (error) {
    console.error('חיבור למונגו נכשל:', error);
    process.exit(1); 
  }
};

export default connectDB;
