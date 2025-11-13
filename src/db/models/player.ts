import { model, Schema, Document } from 'mongoose';

export interface IPlayerDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
}

const playerSchema = new Schema<IPlayerDocument>(
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

export const PlayerModel = model<IPlayerDocument>('Player', playerSchema);

