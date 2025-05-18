import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileLink: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agent",
    required: true,
  },
  taskList: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const list = mongoose.model("list", listSchema);
