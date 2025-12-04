# Измерение производительности сервера

## Встроенные инструменты

### 1. Endpoint для метрик

Доступен endpoint `/api/metrics` для получения статистики производительности:

```bash
curl http://localhost:3000/api/metrics
```

Возвращает:
- `count` - количество запросов
- `averageResponseTime` - среднее время ответа (мс)
- `minResponseTime` - минимальное время ответа (мс)
- `maxResponseTime` - максимальное время ответа (мс)
- `p50`, `p95`, `p99` - процентили времени ответа

### 2. Логирование медленных запросов

Все запросы, которые выполняются дольше 1 секунды, автоматически логируются в консоль с предупреждением.

## Инструменты для бенчмаркинга

### Установка autocannon

```bash
npm install -D autocannon
```

### Запуск бенчмарков

```bash
# Бенчмарк GET запросов
npm run benchmark

# Бенчмарк POST запросов (авторизация)
npm run benchmark:auth

# Кастомный бенчмарк
npx autocannon -c 100 -d 30 http://localhost:3000/api/players
```

Параметры:
- `-c` - количество одновременных соединений
- `-d` - длительность теста в секундах
- `-m` - HTTP метод
- `-H` - заголовки
- `--body` - тело запроса

## Другие инструменты

### 1. wrk (для Linux/Mac)

```bash
# Установка (Mac)
brew install wrk

# Запуск
wrk -t12 -c400 -d30s http://localhost:3000/api/matches
```

### 2. Apache Bench (ab)

```bash
# Установка (Mac)
brew install httpd

# Запуск
ab -n 10000 -c 100 http://localhost:3000/api/matches
```

### 3. Профилирование с clinic.js

```bash
npm install -D clinic
npx clinic doctor -- node dist/index.js
```

### 4. Встроенное профилирование Node.js

```bash
node --prof src/index.ts
node --prof-process isolate-*.log > processed.txt
```

## Мониторинг в реальном времени

### PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start src/index.ts --name game-backend
pm2 monit
```

### Использование встроенных метрик

Метрики собираются автоматически для всех запросов. Для сброса:

```bash
curl -X DELETE http://localhost:3000/api/metrics
```

## Рекомендации

1. **Тестируйте в production-like окружении** - производительность может сильно отличаться
2. **Мониторьте процентили (p95, p99)** - средние значения могут скрывать проблемы
3. **Проверяйте использование памяти** - используйте `process.memoryUsage()`
4. **Анализируйте медленные запросы** - они автоматически логируются
5. **Используйте индексы в MongoDB** - проверьте медленные запросы к БД

## Примеры метрик для мониторинга

- Response Time (время ответа)
- Throughput (запросов в секунду)
- Error Rate (процент ошибок)
- Memory Usage (использование памяти)
- CPU Usage (использование CPU)

