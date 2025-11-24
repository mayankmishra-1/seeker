import express from 'express';
import { startIndexerConsumer } from '../controllers/indexerController.js';

const router = express.Router();

router.post('/build', startIndexerConsumer);

export default router;
