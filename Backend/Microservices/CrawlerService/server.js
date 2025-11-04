import express from 'express';
import cors from 'cors';
import crawlerRoutes from './routes/crawlerRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/crawler', crawlerRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Crawler service running on port ${PORT}`));
