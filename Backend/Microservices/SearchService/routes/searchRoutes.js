import express from 'express';
import { searchDocuments } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchDocuments);

export default router;
