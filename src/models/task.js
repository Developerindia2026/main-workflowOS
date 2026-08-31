import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
  },
  attachment: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
});

const task = mongoose.model("task", taskSchema);

export default task;
