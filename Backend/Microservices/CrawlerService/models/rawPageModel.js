import mongoose from 'mongoose';

const rawPageSchema = new mongoose.Schema({
  url: String,
  title: String,
  text: String,
  crawledAt: { type: Date, default: Date.now },
});

const RawPage = mongoose.model('RawPage', rawPageSchema);

export default RawPage;
