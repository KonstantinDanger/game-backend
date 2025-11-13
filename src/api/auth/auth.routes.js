import express from 'express';
import { PlayerModel } from '../../db/models/player.js';
import { SessionModel } from '../../db/models/session.js';
import {
  generateSalt,
  hashPassword,
  verifyPassword,
} from '../../utils/password.js';
import { generateToken } from '../../utils/token.js';
import { authorize } from './auth.middleware.js';

const router = express.Router();

/**
 * Регистрация нового игрока
 * POST /api/auth/register
 * Body: { name, email, password }
 */
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      });
    }

    // Проверяем, существует ли игрок с таким email
    const existingPlayer = await PlayerModel.findOne({ email });
    if (existingPlayer) {
      return res.status(409).json({
        message: 'Player with this email already exists',
      });
    }

    // Генерируем соль и хешируем пароль
    const passwordSalt = generateSalt();
    const passwordHash = await hashPassword(password, passwordSalt);

    // Создаем нового игрока
    const player = new PlayerModel({
      name,
      email,
      passwordHash,
      passwordSalt,
    });

    await player.save();

    // Создаем сессию
    const token = generateToken();
    const session = new SessionModel({
      userId: player._id,
      token,
      status: 'Active',
    });

    await session.save();

    res.status(201).json({
      message: 'Player registered successfully',
      token,
      player: {
        id: player._id,
        name: player.name,
        email: player.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Вход в систему
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    // Находим игрока по email
    const player = await PlayerModel.findOne({ email });
    if (!player) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Проверяем пароль
    const isValidPassword = await verifyPassword(
      password,
      player.passwordHash,
      player.passwordSalt,
    );

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Создаем новую сессию
    const token = generateToken();
    const session = new SessionModel({
      userId: player._id,
      token,
      status: 'Active',
    });

    await session.save();

    res.json({
      message: 'Login successful',
      token,
      player: {
        id: player._id,
        name: player.name,
        email: player.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Выход из системы
 * POST /api/auth/logout
 * Headers: Authorization: Bearer <token>
 */
router.post('/logout', authorize, async (req, res, next) => {
  try {
    const token = req.token;

    // Деактивируем сессию
    await SessionModel.updateOne({ token }, { status: 'Inactive' });

    res.json({
      message: 'Logout successful',
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Получение информации о текущем пользователе
 * GET /api/auth/me
 * Headers: Authorization: Bearer <token>
 */
router.get('/me', authorize, async (req, res, next) => {
  try {
    const user = req.user;

    res.json({
      player: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
