import { model, Schema, type Document, type Types } from 'mongoose';

export interface IPlayerDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  isAdmin: boolean;
  playedMatchesIds: Types.ObjectId[];
  removedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const playerSchema: Schema<IPlayerDocument> = new Schema<IPlayerDocument>(
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    playedMatchesIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Match',
      required: false,
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

export const PlayerModel = model<IPlayerDocument>('Player', playerSchema);
