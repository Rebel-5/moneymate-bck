const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect("mongodb://172.17.0.2:27017/MoneyMate", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Failed to connect with db");
});
db.once("open", () => {
  console.log("Connected with db");
});
