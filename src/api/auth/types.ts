import { Request } from 'express';
import { IPlayerDocument } from '../../db/models/player.js';

export type IPlayer = IPlayerDocument;

export type AuthRequest = Request & {
  body: any;
  user?: IPlayer;
  token?: string;
};

