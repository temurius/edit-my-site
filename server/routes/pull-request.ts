import type { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { prompt } = req.body as { prompt?: string };
  console.log('Creating mock pull request for prompt:', prompt);

  res.json({ status: 'ok', prUrl: 'https://github.com/mock/pr/123' });
});

export default router;
