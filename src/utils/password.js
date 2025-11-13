import bcrypt from 'bcrypt';
import crypto from 'crypto';

/**
 * Генерирует соль для пароля
 */
export function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Хеширует пароль с использованием соли
 */
export async function hashPassword(password, salt) {
  return bcrypt.hash(password + salt, 10);
}

/**
 * Проверяет пароль
 */
export async function verifyPassword(password, passwordHash, passwordSalt) {
  const hashToCompare = password + passwordSalt;
  return bcrypt.compare(hashToCompare, passwordHash);
}

