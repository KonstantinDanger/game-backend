import { Schema, model, Document } from 'mongoose';

export interface IPlayerMatchInfoDocument extends Document {
  dealtDamage: number;
  reachedLevel: number;
  totalXpReceived: number;
  deathsCount: number;
  currencyReceived: number;
}

const playerMatchInfoSchema = new Schema<IPlayerMatchInfoDocument>(
  {
    dealtDamage: {
      type: Number,
      required: true,
    },
    reachedLevel: {
      type: Number,
      required: true,
    },
    totalXpReceived: {
      type: Number,
      required: true,
    },
    deathsCount: {
      type: Number,
      required: true,
    },
    currencyReceived: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const PlayerMatchInfoModel = model<IPlayerMatchInfoDocument>(
  'PlayerMatchInfo',
  playerMatchInfoSchema,
);

