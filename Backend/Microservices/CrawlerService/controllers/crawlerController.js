import { crawlPage } from '../utils/crawler.js';
import RawPage from '../models/rawPageModel.js';

export const crawlUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL required' });

  const pageData = await crawlPage(url);
  if (!pageData) return res.status(500).json({ message: 'Failed to crawl' });

  // Save raw page data to DB
  const rawPage = new RawPage(pageData);
  await rawPage.save();

  // TODO: Notify Indexer service (e.g., via message queue or HTTP)

  res.json({ message: 'Page crawled and stored', data: pageData });
};

// #####alternate version

import { crawlPage } from '../utils/crawler.js';
import RawPage from '../models/rawPageModel.js';

export const crawlUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL required' });

  const pageData = await crawlPage(url);
  if (!pageData) return res.status(500).json({ message: 'Failed to crawl page' });

  try {
    const updated = await RawPage.findOneAndUpdate(
      { url: pageData.url },
      { title: pageData.title, text: pageData.text, crawledAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ message: 'Page crawled & saved', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'DB error', error: error.message });
  }
};

