const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const app = require("./app.js");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/auth.route.js");
const profileRouter = require("./routes/profile.route.js");
const connectionRouter = require("./routes/connectionrequest.route.js");
// const getConnectionRequestsRouter = require("./routes/getConnectionRequests.route.js");

app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRouter);
app.use("/user", profileRouter);
app.use("/connectionrequest", connectionRouter);
// app.use("/connectionrequest", getConnectionRequestsRouter);



// Connect DB and Start Server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});
