import { Schema, model } from 'mongoose';

const playerClassSchema = new Schema(
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

export const PlayerClassModel = model('PlayerClass', playerClassSchema);
