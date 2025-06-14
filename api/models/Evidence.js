import mongoose from 'mongoose';

const evidenceSchema = new mongoose.Schema({
  case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
  filename: { type: String, required: true },
  originalname: { type: String },
  mimetype: { type: String },
  path: { type: String },
  size: { type: Number }
}, { timestamps: true });

export default mongoose.model('Evidence', evidenceSchema);
