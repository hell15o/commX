const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const app = require("./app.js");
const connectDB = require("./config/db.js");
const userRouter = require("./routes/user.route.js");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);




// Connect DB and Start Server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});
