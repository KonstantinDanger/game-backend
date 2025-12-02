import { Schema, model, type Document } from 'mongoose';

export interface IPlayerClassDocument extends Document {
  name: string;
}

const playerClassSchema: Schema<IPlayerClassDocument> =
  new Schema<IPlayerClassDocument>(
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

export const PlayerClassModel = model<IPlayerClassDocument>(
  'PlayerClass',
  playerClassSchema,
);
