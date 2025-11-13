import bcrypt from 'bcrypt';
import crypto from 'crypto';

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return bcrypt.hash(password + salt, 10);
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
  passwordSalt: string,
): Promise<boolean> {
  const hashToCompare = password + passwordSalt;
  return bcrypt.compare(hashToCompare, passwordHash);
}

