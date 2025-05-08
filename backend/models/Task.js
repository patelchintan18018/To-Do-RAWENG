import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},{timestamps: true});

export default mongoose.model('Task', taskSchema);
