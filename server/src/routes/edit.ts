import { Router } from 'express';
import { mockGenerateEdit } from '../services/aiService.js';

const router = Router();

router.post('/', async (req, res) => {
  const { prompt, contextHtml } = req.body || {};
  // TODO: call OpenAI Responses API when integrating for real
  const result = await mockGenerateEdit(prompt ?? '', contextHtml ?? '');
  res.json(result);
});

export default router;

