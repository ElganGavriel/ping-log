import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  joinCode: string;
  createdByUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    joinCode: { type: String, required: true, unique: true },
    createdByUserId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Company = mongoose.model<ICompany>('Company', companySchema);
