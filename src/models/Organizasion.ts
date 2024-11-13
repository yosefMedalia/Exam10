import mongoose, { Document, Schema } from 'mongoose';

interface Resource {
  name: string;
  amount: number;
}

export interface IOrganization extends Document {
  name: string;
  resources: Resource[];
  budget: number;
}

const organizationSchema = new Schema({
  name: { type: String, required: true },
  resources: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  budget: { type: Number, required: true },
});

export default mongoose.model<IOrganization>('Organization', organizationSchema);
