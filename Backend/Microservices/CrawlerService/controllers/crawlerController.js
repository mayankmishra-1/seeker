import { crawlPage } from '../utils/crawler.js';
import RawPage from '../models/rawPageModel.js';
import { publishToQueue } from '../utils/rabbitmq.js';

export const crawlUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL required' });

  const pageData = await crawlPage(url);
  // console.log(pageData)
  if (!pageData) return res.status(500).json({ message: 'Failed to crawl' });

  // // Save raw page data to DB
  const rawPage = new RawPage(pageData);
  await rawPage.save();

  try{
    // Publish message to Indexer queue
    await publishToQueue('indexer_queue', { pageId: rawPage._id, url, crawledAt: new Date() });
  }catch(error){
    console.error("Failed to publish the message",error)
  }
  


  res.json({ message: 'Page crawled and stored', data: pageData });
};

