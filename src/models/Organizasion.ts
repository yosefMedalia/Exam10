import mongoose, { Schema, Document } from 'mongoose';

interface IResource {
  name: string;
  amount: number;
}

interface IOrganization extends Document {
  name: string;
  resources: IResource[];
  budget: number;
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  resources: [{ name: String, amount: Number }],
  budget: { type: Number, required: true }
});

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);
