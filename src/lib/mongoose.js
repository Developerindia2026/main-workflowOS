const mongoose = require("mongoose");

export default async function ConnectDb() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("DATABASE CONNECTED WIH WORLKFLOW-OS");
}
