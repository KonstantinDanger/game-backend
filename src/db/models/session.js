import { model, Schema, Types } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    token: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: 'Active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

sessionSchema.statics.findSessionByToken = async function (token) {
  const session = await this.findOne({ token, status: 'Active' }).populate(
    'userId',
  );
  if (!session) {
    return null;
  }
  return {
    user: session.userId,
    token: session.token,
  };
};

export const SessionModel = model('Session', sessionSchema);
