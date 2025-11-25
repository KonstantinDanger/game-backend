import { Schema, model, type Document, type Types } from 'mongoose';
import { PlayerModel } from './player';

export interface IPlayerMatchInfoDocument extends Document {
  playerId: Types.ObjectId;
  dealtDamage: number;
  reachedLevel: number;
  totalXpReceived: number;
  deathsCount: number;
  currencyReceived: number;
}

const playerMatchInfoSchema = new Schema<IPlayerMatchInfoDocument>(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      ref: PlayerModel.name,
      required: true,
    },
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
