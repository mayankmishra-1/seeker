import RawPage from '../models/rawPageModel.js';
import Index from '../models/indexModel.js';
import { tokenizeText } from '../utils/tokenizer.js';

export const buildIndex = async (req, res) => {
  try {
    // Fetch unindexed pages or all pages (example: all for simplicity)
    const pages = await RawPage.find();

    for (const page of pages) {
      const tokens = tokenizeText(page.text);
      const frequencyMap = {};

      tokens.forEach((token, i) => {
        if (!frequencyMap[token]) frequencyMap[token] = { frequency: 0, positions: [] };
        frequencyMap[token].frequency++;
        frequencyMap[token].positions.push(i);
      });

      for (const [word, data] of Object.entries(frequencyMap)) {
        const existing = await Index.findOne({ word });
        if (existing) {
          // Update existing entry with new document
          existing.documents.push({
            url: page.url,
            frequency: data.frequency,
            positions: data.positions,
          });
          await existing.save();
        } else {
          // Create new index entry
          const newIndex = new Index({
            word,
            documents: [{
              url: page.url,
              frequency: data.frequency,
              positions: data.positions,
            }],
          });
          await newIndex.save();
        }
      }
    }

    res.json({ message: 'Index built/updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Indexing failed', error: error.message });
  }
};
