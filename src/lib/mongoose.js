const mongoose = require("mongoose");

export default async function ConnectDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/workflow");
  console.log("DATABASE CONNECTED WIH WORLKFLOW-OS");
}
