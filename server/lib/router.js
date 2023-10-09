//Router만 이렇게 빼버림

const express = require("express");
const User = require("../models/user");

let _ = express.Router();

// Post register
_.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = new User();
    //msg를 받아옴으로써 validate를 할 수 있다 만약 msg가 있다면 무언가에 문제가 있는 거기 때문에
    //해당 조건을 가지고 에러 로직을 짤 수 있다
    let msg = user.setFirstName(firstName);

    // // 이곳에서의 error는 setFirstName class name에서 설정한 녀석을 기반으로 두고 동작한다,
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

    msg = await user.setPassword(password);
    if (msg)
      return res.status(400).json({
        error: {
          code: 400,
          type: "password",
          message: msg,
        },
      });

    //save this user to the db

    user.save();

    res.status(200).json(user);

    //이 단계에서 제대로 리턴를 안해주면 계속 request sending에서 hanging over이 된다.
  } catch (e) {
    console.log(e);
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
