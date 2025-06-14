import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  status: { type: String, default: 'open' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Case', caseSchema);
