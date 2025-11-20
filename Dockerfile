# Multi-stage build для production

# Stage 1: Сборка фронтенда
FROM node:20-alpine AS frontend-builder

# Установка git для клонирования репозитория (если нужно)
RUN apk add --no-cache git

WORKDIR /app/frontend

# Клонирование репозитория фронтенда
# ВАРИАНТ 1: Если репозиторий публичный или используете SSH ключ
# ARG FRONTEND_REPO
# RUN git clone ${FRONTEND_REPO} .

# ВАРИАНТ 2: Если фронтенд копируется в build context
# COPY frontend/package*.json ./
# RUN npm ci
# COPY frontend/ .
# RUN npm run build

# ВАРИАНТ 3: Если используете GitHub Actions для сборки и копирования
# (тогда фронтенд уже будет в папке public)
# Этот вариант не требует сборки в Docker

# Stage 2: Сборка бекенда
FROM node:20-alpine AS backend-builder

WORKDIR /app

# Копирование package файлов
COPY package*.json ./

# Установка зависимостей
RUN npm ci --only=production

# Копирование исходного кода бекенда
COPY src/ ./src/

# Копирование собранного фронтенда из первого stage
# (раскомментируйте, если используете Stage 1)
# COPY --from=frontend-builder /app/frontend/dist ./public

# Если фронтенд уже собран и скопирован в public через GitHub Actions
COPY public/ ./public/

# Stage 3: Production образ
FROM node:20-alpine

WORKDIR /app

# Копирование только production зависимостей и кода
COPY --from=backend-builder /app/node_modules ./node_modules
COPY --from=backend-builder /app/src ./src
COPY --from=backend-builder /app/package*.json ./
COPY --from=backend-builder /app/public ./public

# Установка переменных окружения
ENV NODE_ENV=production
ENV FRONTEND_DIST_PATH=/app/public
ENV PORT=3000

# Открытие порта
EXPOSE 3000

# Запуск приложения
CMD ["node", "src/index.js"]


