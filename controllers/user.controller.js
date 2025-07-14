// const User = require("../models/user.model.js")

// const registerUser = async (req, res) =>{
//     const user = req.body
//     // console.log(user)
// }

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateSignUpData = require("../utils/validation");

const registerUser = async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, username, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      username,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    // console.log(user);
    // console.log(token);

    res.cookie("token", token);

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Successfully!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

const logoutUser = (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("LOGOUT Successfully!!");
};

module.exports = { registerUser, loginUser ,logoutUser};
