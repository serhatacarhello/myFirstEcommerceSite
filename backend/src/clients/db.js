const mongoose = require("mongoose");

const url = process.env.MONGO_URI || `mongodb://0.0.0.0:27017/test`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB: Connected"))
  .catch((err) => console.log(err.message));
