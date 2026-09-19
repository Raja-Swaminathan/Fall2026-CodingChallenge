// connection.js
// This file's only job is to connect to MongoDB using Mongoose.
// We keep it separate from server.js so the "how do we connect to the
// database" logic doesn't get mixed in with "how do we start the server."

const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    // Fail loudly and immediately if the .env file is missing or
    // misconfigured, rather than letting confusing errors happen later.
    throw new Error(
      "MONGODB_URI is not set. Did you create a .env file from .env.example?"
    );
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB Atlas");
}

module.exports = connectDB;
