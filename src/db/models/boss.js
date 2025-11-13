import { model, Schema } from 'mongoose';

const bossSchema = new Schema(
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

export const BossModel = model('Boss', bossSchema);
