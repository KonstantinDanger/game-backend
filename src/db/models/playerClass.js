import { Schema, model } from 'mongoose';

const playerClassesSchema = new Schema(
  {
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

export const PlayerClassesCollection = model(
  'playerClasses',
  playerClassesSchema,
);
