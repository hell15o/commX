const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid!");
    }

    const decodedData = await jwt.verify(token, "commX@7");

    const { _id } = decodedData;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User does not exist!");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = userAuth;
