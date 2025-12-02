import { Schema, model, type Document, type Types } from 'mongoose';

export interface IPlayerMatchInfoDocument extends Document {
  playerId: Types.ObjectId;
  matchId: Types.ObjectId;
  playerClassId: Types.ObjectId;
  slainBossesIds: Types.ObjectId[];
  dealtDamage: number;
  reachedLevel: number;
  totalXpReceived: number;
  deathsCount: number;
  currencyReceived: number;
}

const playerMatchInfoSchema: Schema<IPlayerMatchInfoDocument> =
  new Schema<IPlayerMatchInfoDocument>(
    {
      playerId: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
      },
      matchId: {
        type: Schema.Types.ObjectId,
        ref: 'Match',
        required: true,
      },
      playerClassId: {
        type: Schema.Types.ObjectId,
        ref: 'PlayerClass',
        required: true,
      },
      slainBossesIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Boss',
        required: false,
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
