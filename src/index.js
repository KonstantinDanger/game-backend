import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleDateString()}`);
  next();
});

app.use('{/*any}', (req, res, next) => {
  res.status(404).json({ message: 'Path not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Get method performed' });
});

app.listen(3000, () => {
  console.log('Server is running on port: ', PORT);
});
