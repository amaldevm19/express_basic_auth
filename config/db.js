const mongoose = require("mongoose");

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const url = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (err) throw err;
  console.log("Successfully connected to MongoDB");
});
