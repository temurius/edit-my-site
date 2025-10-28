import { Router } from 'express';
import { mockCreatePR } from '../services/githubService.js';

const router = Router();

router.post('/', async (req, res) => {
  // In a real implementation, build branch, commit, open PR via GitHub API
  const { url, number } = await mockCreatePR(req.body);
  res.json({ url, number });
});

export default router;

