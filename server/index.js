const express = require("express");
const router = require("./lib/router");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");
const DB = require("./lib/db");
const bcrypt = require("bcrypt");

// Configure the express server
const app = express();
const port = process.env.PORT || 3000;

let _ = {};

// Starts http server listening on port 3000;
_.start = () => {
  try {
    app.listen(port);
    console.log(`Express server listening on ${port}`);
  } catch (e) {
    throw new Error(e);
  }
};

//해당 쿠키 세션 미들웨어가 가장 먼저 위로 올라와야 한다　-serealize
app.use(
  cookieSession({
    name: "app-auth",
    keys: ["secret-new", "secret-old"],
    maxAge: 60 * 60 * 24,
  })
);

app.use(express.json());

//여기서 passport 시작
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log(`4 - ${user}`);
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = DB.findOne(id);
  if (user) {
    return done(null, { id: user.id, email: user.email });
  } else {
    return done(new Error("No user with id is found"));
  }
});

passport.use(
  "local",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      // This is where we call the db
      // to verify user.

      console.log(`2 - local strategy verify cb: ${JSON.stringify(username)}`);

      let user = DB.findByEmail(username);

      if (!user) {
        return done(null, false);
      }

      //Compare incoming password to stored password
      //using bcrypt
      const result = await new Promise((resolve, reject) => {
        bcrypt.compare(passport, user.security.passwordHash, (err, res) => {
          if (err) {
            reject(err); // 에러 발생 시 reject 호출
          } else {
            resolve(res);
          }
        });
      });

      if (result) {
        return done(null, user);
      } else {
        return done(
          "Password or username is incorrect. Please try again",
          null
        );
      }
    }
  )
);

//이렇게 하면 api를 prefixed할 수 있다, 그 다음 url이 들어갈 녀석을 저 router에 넣어주면 된다
app.use("/api", router);

_.start();
