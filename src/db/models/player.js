import { model, Schema } from 'mongoose';

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    passwordSalt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const PlayerModel = model('Player', playerSchema);
