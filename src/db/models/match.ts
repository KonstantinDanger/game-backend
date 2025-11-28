import { Schema, model, type Document } from 'mongoose';

export interface IMatchDocument extends Document {
  matchTime: number;
  matchDate: Date;
}

const matchSchema = new Schema<IMatchDocument>(
  {
    matchTime: {
      type: Number,
      required: true,
    },
    matchDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MatchModel = model<IMatchDocument>('Match', matchSchema);
