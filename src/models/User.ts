import mongoose, { Schema, Document } from 'mongoose';
import { IMissile } from './Missile';

// הגדרת ממשק User
export interface IUser extends Document {
  username: string;
  password: string;
  organization: string;
  area?: string;
  missiles: IMissile[];

}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,  
  },
  password: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  missiles: {
    type: [
      {name: {
        type: String,
        required: true,
      },
        description:{
        type: String,
        required: true,
      },
        speed: {
          type: Number,
          required: true,
        },
        intercepts:{
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
      }
    ]

  },
 
  
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
