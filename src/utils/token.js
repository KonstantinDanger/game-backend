import crypto from 'crypto';

/**
 * Генерирует случайный токен для сессии
 */
export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

