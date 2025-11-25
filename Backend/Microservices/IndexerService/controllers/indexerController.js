import amqp from 'amqplib';
import RawPage from '../models/rawPageModel.js';
import Index from '../models/indexModel.js';
import { tokenizeText } from '../utils/tokenizer.js';

const QUEUE_NAME = 'indexer_queue';

export const startIndexerConsumer = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log("📥 Indexer waiting for messages...");

    channel.consume(
      QUEUE_NAME,
      async (msg) => {
        if (!msg) return;

        const { pageId, url } = JSON.parse(msg.content.toString());
        console.log("Received message to index:", pageId, url);

        try {
          // 1️⃣ Fetch Raw Page
          const page = await RawPage.findById(pageId);
          if (!page) {
            console.error("❌ Raw page not found:", pageId);
            return channel.ack(msg);
          }

          // 2️⃣ Tokenize text
          const tokens = tokenizeText(page.text);
          const frequencyMap = {};

          tokens.forEach((token, i) => {
            if (!frequencyMap[token]) {
              frequencyMap[token] = { frequency: 0, positions: [] };
            }
            frequencyMap[token].frequency++;
            frequencyMap[token].positions.push(i);
          });

          // 3️⃣ Remove previous index entries for THIS URL
          await Index.updateMany(
            {},
            { $pull: { documents: { url: page.url } } }
          );

          // 4️⃣ Insert new index entries
          for (const [word, data] of Object.entries(frequencyMap)) {
            await Index.findOneAndUpdate(
              { word },
              {
                $push: {
                  documents: {
                    url: page.url,
                    frequency: data.frequency,
                    positions: data.positions,
                  },
                },
              },
              { upsert: true }
            );
          }

          console.log(`✅ Indexed page: ${page.url}`);

          channel.ack(msg); // ACKNOWLEDGE SUCCESS

        } catch (err) {
          console.error("❌ Indexing failed:", err);
          channel.nack(msg, false, true); // requeue the message
        }
      },
      { noAck: false }
    );
  } catch (err) {
    console.error("❌ Indexer failed to start:", err);
  }
};













// import RawPage from '../models/rawPageModel.js';
// import Index from '../models/indexModel.js';
// import { tokenizeText } from '../utils/tokenizer.js';

// export const buildIndex = async (req, res) => {
//   try {
//     // Fetch unindexed pages or all pages (example: all for simplicity)
//     const pages = await RawPage.find();

//     for (const page of pages) {
//       const tokens = tokenizeText(page.text);
//       const frequencyMap = {};

//       tokens.forEach((token, i) => {
//         if (!frequencyMap[token]) frequencyMap[token] = { frequency: 0, positions: [] };
//         frequencyMap[token].frequency++;
//         frequencyMap[token].positions.push(i);
//       });

//       for (const [word, data] of Object.entries(frequencyMap)) {
//         const existing = await Index.findOne({ word });
//         if (existing) {
//           // Update existing entry with new document
//           existing.documents.push({
//             url: page.url,
//             frequency: data.frequency,
//             positions: data.positions,
//           });
//           await existing.save();
//         } else {
//           // Create new index entry
//           const newIndex = new Index({
//             word,
//             documents: [{
//               url: page.url,
//               frequency: data.frequency,
//               positions: data.positions,
//             }],
//           });
//           await newIndex.save();
//         }
//       }
//     }

//     res.json({ message: 'Index built/updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Indexing failed', error: error.message });
//   }
// };
