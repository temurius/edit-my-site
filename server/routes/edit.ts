import type { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { prompt, htmlContext } = req.body as { prompt?: string; htmlContext?: string };

  console.log('Received edit request', { prompt, htmlContextLength: htmlContext?.length ?? 0 });

  res.json({
    before: "<section class='hero'>\n  <h1>Ship updates instantly</h1>\n  <button>Start editing</button>\n</section>",
    after: "<section class='hero'>\n  <h1 style='color:blue'>Ship updates instantly with AI precision</h1>\n  <button style='background:linear-gradient(90deg,#6366f1,#10b981);color:white;padding:16px 28px;border-radius:9999px;'>Start editing</button>\n</section>"
  });
});

export default router;
