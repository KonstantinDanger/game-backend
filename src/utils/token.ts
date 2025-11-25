import crypto from 'crypto';

export function generateToken(): string {
  return crypto.randomBytes(30).toString('base64');
}
