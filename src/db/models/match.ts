import { IPlayer } from '@/api/auth/types';
import { Schema, model, type Document, type Types } from 'mongoose';

export interface IMatchDocument extends Document {
  matchDate: Date;
  matchTime: number;
  winnerId: Types.ObjectId;
  loserId: Types.ObjectId;
  removedAt: Date;
  winner: IPlayer;
  loser: IPlayer;
}

const matchSchema: Schema<IMatchDocument> = new Schema<IMatchDocument>(
  {
    winnerId: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: false,
    },
    loserId: {
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
    removedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MatchModel = model<IMatchDocument>('Match', matchSchema);
