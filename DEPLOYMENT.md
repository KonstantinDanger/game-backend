# Инструкция по деплою для production

Этот проект настроен для работы с двумя отдельными репозиториями (фронтенд и бекенд) и поддерживает несколько способов деплоя.

## Режимы работы

### Development режим
В режиме разработки бекенд проксирует запросы к Vite dev-серверу (порт 5173 по умолчанию).

**Запуск:**
1. В папке `game-site`: `npm run dev`
2. В папке `game-backend`: `npm run dev`

Бекенд будет работать на `localhost:3000` и автоматически проксировать фронтенд.

### Production режим
В production режиме бекенд раздает статические файлы из собранного фронтенда.

## Варианты деплоя

### Вариант 1: GitHub Actions (Рекомендуется)

GitHub Actions автоматически собирает фронтенд и деплоит бекенд.

#### Настройка Secrets в GitHub

В настройках репозитория бекенда добавьте следующие secrets:

1. **FRONTEND_REPO** - название репозитория фронтенда в формате `owner/repo-name`
   - Пример: `your-username/game-site`

2. **FRONTEND_BRANCH** (опционально) - ветка фронтенда для сборки
   - По умолчанию: `main`

3. **GITHUB_TOKEN** - автоматически доступен, но может потребоваться для приватных репозиториев

#### Настройка workflow

1. Файл `.github/workflows/deploy.yml` уже настроен
2. Добавьте шаги для деплоя на ваш сервер (примеры в комментариях)
3. Workflow запустится автоматически при push в `main`/`master` или вручную через `workflow_dispatch`

#### Пример деплоя через SSH:

Раскомментируйте и настройте секцию в `.github/workflows/deploy.yml`:

```yaml
- name: Deploy to server
  uses: appleboy/ssh-action@master
  with:
    host: ${{ secrets.HOST }}
    username: ${{ secrets.USERNAME }}
    key: ${{ secrets.SSH_KEY }}
    script: |
      cd /path/to/app
      git pull
      npm ci --production
      pm2 restart app
```

Добавьте secrets: `HOST`, `USERNAME`, `SSH_KEY`

### Вариант 2: Docker

Используйте Docker для сборки и деплоя.

#### Локальная сборка:

```bash
# Соберите фронтенд и скопируйте в public
cd ../game-site
npm run build
cd ../game-backend
mkdir -p public
cp -r ../game-site/dist/* public/

# Соберите Docker образ
docker build -t game-backend:latest .

# Запустите контейнер
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e FRONTEND_DIST_PATH=/app/public \
  -e MONGODB_USER=your_user \
  -e MONGODB_PASSWORD=your_password \
  -e MONGODB_URL=your_url \
  -e MONGODB_DB=your_db \
  game-backend:latest
```

#### В GitHub Actions с Docker:

Раскомментируйте секцию в `.github/workflows/deploy.yml`:

```yaml
- name: Build Docker image
  run: docker build -t your-app:${{ github.sha }} .

- name: Push to registry
  run: docker push your-app:${{ github.sha }}
```

### Вариант 3: Ручной деплой

1. **Соберите фронтенд:**
   ```bash
   cd ../game-site
   npm run build
   ```

2. **Скопируйте dist в бекенд:**
   ```bash
   cd ../game-backend
   mkdir -p public
   cp -r ../game-site/dist/* public/
   ```

3. **Установите переменные окружения:**
   ```bash
   export NODE_ENV=production
   export FRONTEND_DIST_PATH=$(pwd)/public
   ```

4. **Запустите бекенд:**
   ```bash
   npm ci --production
   npm start
   ```

## Переменные окружения

### Обязательные:
- `MONGODB_USER` - пользователь MongoDB
- `MONGODB_PASSWORD` - пароль MongoDB
- `MONGODB_URL` - URL MongoDB
- `MONGODB_DB` - название базы данных

### Опциональные:
- `PORT` - порт сервера (по умолчанию: 3000)
- `NODE_ENV` - режим работы (`development` или `production`)
- `FRONTEND_DIST_PATH` - путь к собранному фронтенду (по умолчанию: `../../game-site/dist`)
- `VITE_DEV_PORT` - порт Vite dev-сервера (по умолчанию: 5173)

## Структура проекта после сборки

```
game-backend/
├── src/
├── public/          # Собранный фронтенд (создается в CI/CD)
│   ├── index.html
│   ├── assets/
│   └── ...
├── node_modules/
├── package.json
└── ...
```

## Troubleshooting

### Фронтенд не загружается в production

1. Проверьте, что папка `public` существует и содержит файлы из `dist`
2. Проверьте переменную окружения `FRONTEND_DIST_PATH`
3. Убедитесь, что `NODE_ENV=production`

### Ошибка при клонировании фронтенда в GitHub Actions

1. Проверьте, что `FRONTEND_REPO` указан правильно
2. Для приватных репозиториев используйте Personal Access Token в `GITHUB_TOKEN`
3. Убедитесь, что у токена есть права на чтение репозитория фронтенда


