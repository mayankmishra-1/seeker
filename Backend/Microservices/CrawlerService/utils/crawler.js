import axios from 'axios';
import * as cheerio from 'cheerio';

export const crawlPage = async (url) => {
  try {
    console.log(url)
    const { data } = await axios.get(url);
    console.log(data)
    const $ = cheerio.load(data);
    const text = $('body').text();
    const title = $('title').text();
    return { url, title, text };
  } catch (error) {
    console.error(`Crawler Error for ${url}:`, error.message);
    return null;
  }
};
