import express from 'express';
import { buildIndex } from '../controllers/indexerController.js';

const router = express.Router();

router.post('/build', buildIndex);

export default router;
