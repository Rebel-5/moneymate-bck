const express = require("express");
const app = express();
const port = 4110;
const cors = require("cors");
const bodyparser = require("body-parser");
require("./utils/db");
const userRouter = require("./routes/userRoutes");
const groupRouter = require("./routes/groupRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const friendRouter = require("./routes/friendsRoutes");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//Middlewares
app.use(bodyparser.json());
app.use(cors());

// User API
app.use("/api/users", userRouter);

// Group API
app.use("/api", groupRouter);

// Expense API
app.use("/api/expenses", expenseRouter);

// Friends API
app.use("/api", friendRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
// node behavious = asyncrouns
