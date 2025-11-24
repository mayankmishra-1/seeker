import dotenv from 'dotenv'
import { connectDB } from './mongoDbConfig.js';

dotenv.config();

export const initDB = () => connectDB(process.env.MONGO_URI);
