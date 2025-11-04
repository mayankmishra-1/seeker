import express from 'express';
import cors from 'cors';
import searchRoutes from './routes/searchRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/search', searchRoutes);

const PORT = 4002;
app.listen(PORT, () => console.log(`Search service running on port ${PORT}`));
