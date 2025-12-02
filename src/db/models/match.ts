import { Schema, model, type Document, type Types } from 'mongoose';

export interface IMatchDocument extends Document {
  name: string;
  winnerId: Types.ObjectId;
  looserId: Types.ObjectId;
  matchTime: number;
  matchDate: Date;
}

const matchSchema: Schema<IMatchDocument> = new Schema<IMatchDocument>(
  {
    name: {
      type: String,
      required: false,
      default: 'Match Name',
    },
    winnerId: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: false,
    },
    looserId: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: false,
    },
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
