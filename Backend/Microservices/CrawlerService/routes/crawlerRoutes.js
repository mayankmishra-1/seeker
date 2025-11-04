import express from 'express';
import { crawlUrl } from '../controllers/crawlerController.js';

const router = express.Router();

router.post('/crawl', crawlUrl);

export default router;
