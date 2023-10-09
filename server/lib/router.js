//Router만 이렇게 빼버림

const express = require("express");
const User = require("../models/user");

let _ = express.Router();

// Post register
_.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    let user = new User();

    let msg = false;
    //만약 setFirstName이 문제가 있다면 msg의 string이 오게 되기 때문에 true가 될 것이다.
    //이를 이용해서 handling해야 할듯
    msg = user.setFirstName(firstName);
    if (msg)
      return res.status(400).json({
        error: {
          code: 400,
          type: "first name",
          message: msg,
        },
      });

    msg = user.setLastName(lastName);
    if (msg)
      return res.status(400).json({
        error: {
          code: 400,
          type: "last name",
          message: msg,
        },
      });

    msg = user.setEmail(email);
    if (msg)
      return res.status(400).json({
        error: {
          code: 400,
          type: "email",
          message: msg,
        },
      });

    msg = await user.setEmail(email);
    if (msg)
      return res.status(400).json({
        error: {
          code: 400,
          type: "email",
          message: msg,
        },
      });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
});

// Post /Login
_.post("/login", async (req, res) => {
  try {
    res.status(200).json({
      timestamp: Date.now(),
      message: "Logged in successfully",
      code: 200,
    });
  } catch (e) {
    throw new Error(e);
  }
});

_.post("/logout", async (req, res) => {
  try {
    res.status(200).json({
      timestamp: Date.now(),
      message: "Logged out successfully",
      code: 200,
    });
  } catch (e) {
    throw new Error(e);
  }
});

//Error handling
_.all("*", async (req, res) => {
  try {
    res.status(404).json({
      timestamp: Date.now(),
      message: "no route matches your request",
      code: 404,
    });
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = _;
