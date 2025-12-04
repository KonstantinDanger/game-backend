import express from 'express';
import {
  getPerformanceMetrics,
  resetMetrics,
} from '@/middleware/performance.middleware';

const router = express.Router();

router.get('/', (_req, res) => {
  const metrics = getPerformanceMetrics();
  res.json({
    metrics,
    timestamp: new Date().toISOString(),
  });
});

router.delete('/', (_req, res) => {
  resetMetrics();
  res.json({ message: 'Metrics reset successfully' });
});

export default router;
