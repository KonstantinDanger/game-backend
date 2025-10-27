import { Schema, model } from 'mongoose';

const matchesSchema = new Schema(
  {
    // playerId[]?
    // playerId winner?
    // playerId loser?

    // matchTime is described in minutes
    matchTime: {
      type: Number,
      required: true,
    },

    // We  can only store numbers, booleans and strings, not DateTime
    // thus matchDate is an amount of milliseconds passed since 1970,
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

export const MatchesCollection = model('matches', matchesSchema);
