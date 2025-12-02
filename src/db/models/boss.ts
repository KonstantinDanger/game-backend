import { model, Schema, type Document } from 'mongoose';

export interface IBossDocument extends Document {
  name: string;
  health: number;
  xp: number;
  damage: number;
}

const bossSchema: Schema<IBossDocument> = new Schema<IBossDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    health: {
      type: Number,
      required: true,
    },
    xp: {
      type: Number,
      required: true,
    },
    damage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BossModel = model<IBossDocument>('Boss', bossSchema);
