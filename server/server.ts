import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import editRoutes from './routes/edit.js';
import pullRequestRoutes from './routes/pull-request.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 5000);

app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:4200', credentials: true }));
app.use(bodyParser.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/edit', editRoutes);
app.use('/api/pull-request', pullRequestRoutes);

app.listen(port, () => {
  console.log(`Mock AI server listening on http://localhost:${port}`);
});
