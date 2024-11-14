import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  role: 'attacker' | 'defender';
  region?: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['attacker', 'defender'], required: true },
  region: { type: String }
});

export default mongoose.model<IUser>('User', UserSchema);
