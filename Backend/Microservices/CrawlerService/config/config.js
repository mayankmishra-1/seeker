import { connectDB } from './config.js';

export const initDB = () => connectDB('mongodb://localhost:27017/crawlerDB');
