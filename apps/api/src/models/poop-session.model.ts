import mongoose, { Document, Schema } from 'mongoose';

export interface IPoopSession extends Document {
  userId: string;
  durationSeconds: number;
  hourlyRate: number;
  currency: string;
  moneyEarned: number;
  createdAt: Date;
  updatedAt: Date;
}

const poopSessionSchema = new Schema<IPoopSession>(
  {
    userId: { type: String, required: true },
    durationSeconds: { type: Number, required: true, min: 0 },
    hourlyRate: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true },
    moneyEarned: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

poopSessionSchema.index({ userId: 1, createdAt: -1 });

export const PoopSession = mongoose.model<IPoopSession>('PoopSession', poopSessionSchema);
