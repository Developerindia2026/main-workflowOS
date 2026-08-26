import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkIn: {
      time: {
        type: Date,
        required: true,
      },
      location: {
        longitude: Number,
        latitude: Number,
      },
    },
    checkOut: {
      time: {
        type: Date,
        default: null,
      },
      location: {
        longitude: Number,
        latitude: Number,
      },
    },
    status: {
      type: String,
      enum: ["present", "absent", "half day"],
      default: "absent",
    },
    workingTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const attendence = mongoose.model("attendence", attendenceSchema);

export default attendence;
