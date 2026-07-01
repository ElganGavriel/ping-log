import mongoose, { Document, Schema } from 'mongoose';

export interface IExample extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const exampleSchema = new Schema<IExample>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const Example = mongoose.model<IExample>('Example', exampleSchema);
