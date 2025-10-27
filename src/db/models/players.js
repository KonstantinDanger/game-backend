import { model, Schema } from 'mongoose';

const playersSchema = new Schema(
  {
    // playedMatchesId[]?

    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const PlayersCollection = model('players', playersSchema);
