import { Schema, model, Document } from 'mongoose';

export interface IMatchDocument extends Document {
  matchTime: number;
  matchDate: number;
}

const matchSchema = new Schema<IMatchDocument>(
  {
    matchTime: {
      type: Number,
      required: true,
    },
    matchDate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MatchModel = model<IMatchDocument>('Match', matchSchema);

