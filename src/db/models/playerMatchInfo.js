import { Schema, model } from 'mongoose';

const playerMatchInfoSchema = new Schema(
  {
    // playerId?
    // usedClassId?
    // slainBossesId[]?

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

export const PlayerMatchInfoCollection = model(
  'playerMatchInfo',
  playerMatchInfoSchema,
);
