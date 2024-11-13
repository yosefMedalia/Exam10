import mongoose, { Schema, Document } from 'mongoose';

// הגדרת ממשק missile
export interface IMissile extends Document {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
    amount?:Number
}

const missileSchema = new Schema<IMissile>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
    },
    intercepts: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    amount:{
        type:Number,
        required: false
    }
});

const Missile = mongoose.model<IMissile>('Missile', missileSchema);

export default Missile;



