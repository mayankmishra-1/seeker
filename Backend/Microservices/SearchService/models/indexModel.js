import mongoose from 'mongoose';

const indexSchema = new mongoose.Schema({
  word: { type: String, unique: true },
  documents: [
    {
      url: String,
      frequency: Number,
      positions: [Number],
    },
  ],
});

const Index = mongoose.model('Index', indexSchema);

export default Index;
