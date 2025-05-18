import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const task = mongoose.model("task", taskSchema);
