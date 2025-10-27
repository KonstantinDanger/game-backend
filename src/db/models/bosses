import { model, Schema } from 'mongoose';

const bossesSchema = new Schema(
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

export const bossesCollection = model('bosses', bossesSchema);
