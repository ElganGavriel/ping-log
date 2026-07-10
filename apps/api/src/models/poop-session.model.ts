import mongoose, { Document, Schema } from 'mongoose';

export interface IPoopSession extends Document {
  userId: string;
  startedAt: Date;
  endedAt: Date | null;
  durationSeconds: number | null;
  hourlyRate: number;
  currency: string;
  moneyEarned: number | null;
  createdAt: Date;
  updatedAt: Date;
}

const poopSessionSchema = new Schema<IPoopSession>(
  {
    userId: { type: String, required: true },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, default: null },
    durationSeconds: { type: Number, default: null, min: 0 },
    hourlyRate: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true },
    moneyEarned: { type: Number, default: null, min: 0 },
  },
  { timestamps: true },
);

poopSessionSchema.index({ userId: 1, createdAt: -1 });
poopSessionSchema.index({ userId: 1, endedAt: 1 });

export const PoopSession = mongoose.model<IPoopSession>('PoopSession', poopSessionSchema);
