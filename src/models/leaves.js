import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["sl", "cl", "el", "others"],
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["approved", "pending", "decline"],
    default: "pending",
  },
});

const leave = mongoose.models.leave || mongoose.model("leave", leaveSchema);

export default leave;
