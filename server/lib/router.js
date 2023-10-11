//Router만 이렇게 빼버림

const express = require("express");
const User = require("../models/user");
const passport = require("passport");

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

    user.save(req.body);

    res.status(200).json(user);

    //이 단계에서 제대로 리턴를 안해주면 계속 request sending에서 hanging over이 된다.
  } catch (e) {
    console.log(e);
  }
});

// Post /Login
// _.post("/login", async (req, res) => {
//   try {
//     res.status(200).json({
//       timestamp: Date.now(),
//       message: "Logged in successfully",
//       code: 200,
//     });
//   } catch (e) {
//     throw new Error(e);
//   }
// });

_.post("/login", (req, res, next) => {
  console.log(`1 - login handler ${JSON.stringify(req.body)}`);
  passport.authenticate("local", (err, user) => {
    console.log("3라우터유저", `${JSON.stringify(user)}`);
    // 이 안에다가 우리가 validate할 녀석을 넣어줘야 한다, 해당 조건이 클리어 할 경우
    // status 200을 return하는 것을 이 함수의 목적으로 한다

    //password가 matching하지 않았을 때 발생되는 에러 메세지가 들어가야한다
    if (err) {
      return res.status(401).json({
        timestamp: Date.now(),
        msg: `Access denied. Username or password is incorrect`,
        data: 401,
      });
    }
    if (!user) {
      return res.status(401).json({
        timestamp: Date.now(),
        msg: `Unauthorized user`,
        code: 401,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        redirectTo: "/profile",
      });
    });
  })(req, res, next);
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
