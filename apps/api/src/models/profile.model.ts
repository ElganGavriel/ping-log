import mongoose, { Document, Schema, Types } from 'mongoose';

export type WageMode = 'HOURLY' | 'SALARY';

export interface IProfile extends Document {
  userId: string;
  displayName: string;
  email: string;
  currency: string | null;
  wageMode: WageMode | null;
  hourlyWage: number | null;
  monthlySalary: number | null;
  hoursPerWeek: number | null;
  companyId: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    userId: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    currency: { type: String, default: null },
    wageMode: { type: String, enum: ['HOURLY', 'SALARY'], default: null },
    hourlyWage: { type: Number, default: null },
    monthlySalary: { type: Number, default: null },
    hoursPerWeek: { type: Number, default: null },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', default: null },
  },
  { timestamps: true },
);

export const Profile = mongoose.model<IProfile>('Profile', profileSchema);
