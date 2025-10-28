import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import editRoutes from './routes/edit.js';
import prRoutes from './routes/pull-request.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(bodyParser.json({ limit: '2mb' }));

const limiter = rateLimit({ windowMs: 60_000, max: 60 });
app.use(limiter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/edit', editRoutes);
app.use('/api/pull-request', prRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

