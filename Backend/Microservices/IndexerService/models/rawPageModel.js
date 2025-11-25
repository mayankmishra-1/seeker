import mongoose from 'mongoose';

const rawPageSchema = new mongoose.Schema({
  url: { type: String, unique: true },
  title: String,
  text: String,
  crawledAt: Date,
},{
    collection:'rawPages'
  });

const RawPage = mongoose.model('RawPage', rawPageSchema);

export default RawPage;
