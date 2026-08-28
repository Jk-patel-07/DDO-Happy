import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
  page: { type: Number, required: true },
  action: { type: String, required: true },
  selectedOption: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now }
});

const visitorSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true, index: true },
  name: { type: String, default: "" },
  vercelUrl: { type: String, default: "" },
  interactions: [interactionSchema],
  completed: { type: Boolean, default: false }
}, {
  timestamps: true
});

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;
