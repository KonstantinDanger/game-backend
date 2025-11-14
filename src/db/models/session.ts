import { model, Schema, Types, Document, Model } from 'mongoose';
import { IPlayer } from '../../api/auth/types.js';

export interface ISessionDocument extends Document {
  userId: Types.ObjectId;
  token?: string;
  status: string;
}

export interface ISessionResult {
  user: IPlayer;
  token: string;
}

interface ISessionModel extends Model<ISessionDocument> {
  findSessionByToken(token: string): Promise<ISessionResult | null>;
}

const sessionSchema = new Schema<ISessionDocument>(
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

sessionSchema.statics.findSessionByToken = async function (
  token: string,
): Promise<ISessionResult | null> {
  const session = await this.findOne({ token, status: 'Active' }).populate(
    'userId',
  );
  if (!session) {
    return null;
  }
  return {
    user: session.userId as IPlayer,
    token: session.token || '',
  };
};

export const SessionModel = model<ISessionDocument, ISessionModel>(
  'Session',
  sessionSchema,
);

