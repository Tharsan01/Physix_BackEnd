const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;  // Make sure the URI is being pulled correctly from the environment variables
    if (!uri) {
      throw new Error("MONGO_URI is not defined.");
    }
   const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;