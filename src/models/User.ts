import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string; 
  password: string; 
  role: string;     // תפקיד: 'defense' או 'attack'
  area?: string;    //  רק עבור משתמשי צה"ל
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, 
  area: { type: String }, 
});

export default mongoose.model<IUser>('User', userSchema);
