import express from 'express';
import axios from 'axios';
import { SERVICE_URLS } from './config.js';

const router = express.Router();

router.post('/crawler/crawl', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICE_URLS.crawler}/api/crawler/crawl`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
  }
});

router.post('/indexer/build', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICE_URLS.indexer}/api/indexer/build`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICE_URLS.search}/api/search`, { params: req.query });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
  }
});

export default router;
