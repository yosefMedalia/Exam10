import mongoose, { Document, Schema } from 'mongoose';

export interface IMissile extends Document {
  name: string;
  description: string;
  speed: number;
  intercepts: string[];
  price: number;
}

const missileSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  speed: { type: Number, required: true },
  intercepts: { type: [String], default: [] },
  price: { type: Number, required: true },
});

export default mongoose.model<IMissile>('Missile', missileSchema);
