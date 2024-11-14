import mongoose, { Schema, Document } from 'mongoose';
import fs from 'fs';
import path from 'path';

interface IUser extends Document {
  username: string;
  password: string;
  role: 'IDF' | 'Hezbollah' | 'Hamas' | 'Houthis' | 'IRGC';
  region?: string;
  missiles?: {
    type: string;
    count: number;
  }[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['IDF', 'Hezbollah', 'Hamas', 'Houthis', 'IRGC'], required: true },
  region: { type: String },
  missiles: [
    {
      type: { type: String },
      count: { type: Number }
    }
  ]
});

UserSchema.pre('save', function (next) {
  const user = this as unknown as IUser;
  
  const dataPath = path.join(__dirname, '../../data/organizations.json');

  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // יצירת שם מלא כדי למצוא את המידע המתאים בקובץ
    const fullName = `${user.role} - ${user.region}`;
    const orgData = data.find((org: any) => org.name === fullName);

    if (orgData) {
      // הוספת המשאבים כטילים למשתמש
      user.missiles = orgData.resources.map((resource: any) => ({
        type: resource.name,
        count: resource.amount
      }));
    }

    next();
  } catch (error) {
    console.error("Error reading JSON file or processing data:", error);
    next(new Error("Failed to save user due to data processing error."));
  }
});

export default mongoose.model<IUser>('User', UserSchema);
