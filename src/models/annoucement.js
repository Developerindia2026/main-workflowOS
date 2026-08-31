import mongoose from "mongoose";

const AnnoucementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const annoucement =
  mongoose.models.annoucement ||
  mongoose.model("annoucement", AnnoucementSchema);

export default annoucement;
