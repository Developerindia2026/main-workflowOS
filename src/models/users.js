import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["employee", "manager", "admin"],
    default: "employee",
  },
  designation: {
    type: String,
    requried: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  profileImage: {
    type: String,
  },
});

const user = mongoose.models.user || mongoose.model("user", userSchema);

export default user;
