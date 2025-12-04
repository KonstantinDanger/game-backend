import { z } from 'zod';
import { Types } from 'mongoose';
import { VALIDATION_LIMITS } from '@/constants/validation';
import {
  EMAIL_REGEX,
  OBJECT_ID_REGEX,
  PASSWORD_STRONG_REGEX,
  NAME_REGEX,
} from '@/constants/regex';

export const objectIdSchema = z
  .string()
  .regex(OBJECT_ID_REGEX, 'Invalid MongoDB ObjectId format')
  .refine((id) => Types.ObjectId.isValid(id), 'Invalid MongoDB ObjectId');

export const emailSchema = z
  .string()
  .min(
    VALIDATION_LIMITS.EMAIL_MIN_LENGTH,
    `Email must be at least ${VALIDATION_LIMITS.EMAIL_MIN_LENGTH} characters`,
  )
  .max(
    VALIDATION_LIMITS.EMAIL_MAX_LENGTH,
    `Email must be at most ${VALIDATION_LIMITS.EMAIL_MAX_LENGTH} characters`,
  )
  .email('Invalid email format')
  .regex(EMAIL_REGEX, 'Invalid email format');

export const passwordSchema = z
  .string()
  .min(
    VALIDATION_LIMITS.PASSWORD_MIN_LENGTH,
    `Password must be at least ${VALIDATION_LIMITS.PASSWORD_MIN_LENGTH} characters`,
  )
  .max(
    VALIDATION_LIMITS.PASSWORD_MAX_LENGTH,
    `Password must be at most ${VALIDATION_LIMITS.PASSWORD_MAX_LENGTH} characters`,
  )
  .regex(
    PASSWORD_STRONG_REGEX,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
  );

export const nameSchema = z
  .string()
  .min(
    VALIDATION_LIMITS.NAME_MIN_LENGTH,
    `Name must be at least ${VALIDATION_LIMITS.NAME_MIN_LENGTH} character`,
  )
  .max(
    VALIDATION_LIMITS.NAME_MAX_LENGTH,
    `Name must be at most ${VALIDATION_LIMITS.NAME_MAX_LENGTH} characters`,
  )
  .regex(NAME_REGEX, 'Name contains invalid characters')
  .trim();

export const stringSchema = (
  minLength = VALIDATION_LIMITS.STRING_MIN_LENGTH,
  maxLength = VALIDATION_LIMITS.STRING_MAX_LENGTH,
) =>
  z
    .string()
    .min(minLength, `String must be at least ${minLength} characters`)
    .max(maxLength, `String must be at most ${maxLength} characters`)
    .trim();

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .pipe(
      z
        .number()
        .int()
        .min(VALIDATION_LIMITS.PAGE_MIN)
        .max(VALIDATION_LIMITS.PAGE_MAX),
    ),
  perPage: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .pipe(
      z
        .number()
        .int()
        .min(VALIDATION_LIMITS.PER_PAGE_MIN)
        .max(VALIDATION_LIMITS.PER_PAGE_MAX),
    ),
});

export const registerSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
  }),
});

export const updateCurrentUserSchema = z.object({
  body: z.object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
  }),
});

export const updatePlayerSchema = z.object({
  body: z.object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
  }),
  params: z.object({
    id: objectIdSchema,
  }),
});

export const getPlayerSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const deletePlayerSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listPlayersQuerySchema = paginationSchema;

export const listPlayersSchema = z.object({
  query: paginationSchema,
});

export const createMatchSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name must be at least 1 character')
      .max(
        VALIDATION_LIMITS.MATCH_NAME_MAX_LENGTH,
        `Name must be at most ${VALIDATION_LIMITS.MATCH_NAME_MAX_LENGTH} characters`,
      )
      .trim(),
    matchTime: z.coerce.date(),
    matchDate: z.coerce.date(),
  }),
});

export const updateMatchSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name must be at least 1 character')
      .max(
        VALIDATION_LIMITS.MATCH_NAME_MAX_LENGTH,
        `Name must be at most ${VALIDATION_LIMITS.MATCH_NAME_MAX_LENGTH} characters`,
      )
      .trim()
      .optional(),
    matchTime: z.coerce.date().optional(),
    matchDate: z.coerce.date().optional(),
  }),
  params: z.object({
    id: objectIdSchema,
  }),
});

export const getMatchSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const deleteMatchSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listMatchesQuerySchema = paginationSchema;

export const listMatchesSchema = z.object({
  query: paginationSchema,
});

export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

export function safeValidateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
