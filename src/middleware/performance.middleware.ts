import type { Request, Response, NextFunction } from 'express';

interface PerformanceMetrics {
  responseTime: number;
  timestamp: Date;
  method: string;
  url: string;
  statusCode?: number;
}

const metrics: PerformanceMetrics[] = [];
const MAX_METRICS = 1000;

export function performanceMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startTime = process.hrtime.bigint();

  res.on('finish', () => {
    const endTime = process.hrtime.bigint();
    const responseTime = Number(endTime - startTime) / 1_000_000;

    const metric: PerformanceMetrics = {
      responseTime,
      timestamp: new Date(),
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
    };

    metrics.push(metric);

    if (metrics.length > MAX_METRICS) {
      metrics.shift();
    }

    if (responseTime > 1000) {
      console.warn('Slow request detected:', {
        method: metric.method,
        url: metric.url,
        responseTime: `${responseTime.toFixed(2)}ms`,
        statusCode: metric.statusCode,
      });
    }
  });

  next();
}

export function getPerformanceMetrics() {
  if (metrics.length === 0) {
    return {
      count: 0,
      averageResponseTime: 0,
      minResponseTime: 0,
      maxResponseTime: 0,
      p50: 0,
      p95: 0,
      p99: 0,
    };
  }

  const responseTimes = metrics
    .map((m) => m.responseTime)
    .sort((a, b) => a - b);
  const sum = responseTimes.reduce((acc, time) => acc + time, 0);
  const average = sum / responseTimes.length;
  const min = responseTimes[0];
  const max = responseTimes[responseTimes.length - 1];

  const p50 = responseTimes[Math.floor(responseTimes.length * 0.5)];
  const p95 = responseTimes[Math.floor(responseTimes.length * 0.95)];
  const p99 = responseTimes[Math.floor(responseTimes.length * 0.99)];

  return {
    count: metrics.length,
    averageResponseTime: Math.round(average * 100) / 100,
    minResponseTime: Math.round(min * 100) / 100,
    maxResponseTime: Math.round(max * 100) / 100,
    p50: Math.round(p50 * 100) / 100,
    p95: Math.round(p95 * 100) / 100,
    p99: Math.round(p99 * 100) / 100,
  };
}

export function resetMetrics() {
  metrics.length = 0;
}
