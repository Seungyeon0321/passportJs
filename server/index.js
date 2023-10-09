const express = require("express");
const router = require("./lib/router");

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

app.use(express.json());

//이렇게 하면 api를 prefixed할 수 있다, 그 다음 url이 들어갈 녀석을 저 router에 넣어주면 된다
app.use("/api", router);

_.start();
