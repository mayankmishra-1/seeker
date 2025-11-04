import Index from '../models/indexModel.js';
import { tokenizeText } from '../utils/tokenizer.js';
import { calculateTFIDF } from '../utils/ranking.js';

export const searchDocuments = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: 'Query param required' });

  const tokens = tokenizeText(query);
  const resultsMap = new Map();

  for (const token of tokens) {
    const indexEntry = await Index.findOne({ word: token });
    if (indexEntry) {
      indexEntry.documents.forEach((doc) => {
        const prev = resultsMap.get(doc.url) || { url: doc.url, score: 0 };
        const score = calculateTFIDF(doc, indexEntry, tokens);
        resultsMap.set(doc.url, { url: doc.url, score: prev.score + score });
      });
    }
  }

  const results = Array.from(resultsMap.values()).sort((a, b) => b.score - a.score);
  res.json(results.slice(0, 10));
};
