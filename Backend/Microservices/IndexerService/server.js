import express from 'express';
import cors from 'cors';
import { initDB } from './config/config.js';
import indexerRoutes from './routes/indexerRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

await initDB();

app.use('/api/indexer', indexerRoutes);

const PORT = 4001;
app.listen(PORT, () => console.log(`Indexer service running on port ${PORT}`));
