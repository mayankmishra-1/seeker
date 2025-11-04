import express from 'express';
import cors from 'cors';
import indexerRoutes from './routes/indexerRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/indexer', indexerRoutes);

const PORT = 4001;
app.listen(PORT, () => console.log(`Indexer service running on port ${PORT}`));
