// Dependencies
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const validate = require("validate.js");
const constraints = require("../lib/constraints");
const db = require("../lib/db");

let _ = class User {
  constructor() {
    (this.created = new Date()),
      (this.id = uuidv4()),
      (this.name = {
        first: "suengyeon",
        last: "Ji",
      }),
      (this.email = null),
      (this.security = {
        passwordHash: null,
      }),
      (this.banned = false);
  }

  // Save the user to the database
  save(data) {
    db.write(data);
    console.log(`Successfully saved user ${this.id} to the database`);
  }

  //Find a user with the given id
  find(id) {
    return "";
  }

  setFirstName(firstName) {
    try {
      if (firstName) {
        //do any sanitisation here
        firstName = firstName.trim().replace(/ +/g, " ");
      }

      // validate the input from
      let msg = validate.single(firstName, constraints.name);
      if (msg) {
        return msg;
      } else {
        this.name.first = firstName;

        return;
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  setLastName(lastName) {
    try {
      if (lastName) {
        //do any sanitisation here
        lastName = lastName.trim().replace(/ +/g, " ");
      }

      // validate the input from
      let msg = validate.single(lastName, constraints.name);

      //msg가 있는 것 자체로 someting wrong이다
      if (msg) {
        return msg;
      } else {
        this.name.last = lastName;

        return;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  setEmail(email) {
    try {
      let msg = validate.single(email, constraints.email);

      if (msg) {
        return msg;
      } else {
        this.email = email;
        return;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  //10자리를 password를 hashing 해야하기 때문에 async로 해야한다
  async setPassword(password) {
    try {
      let msg = validate.single(password, constraints.password);

      if (msg) {
        return msg;
      } else {
        this.security.passwordHash = await bcrypt.hash(password, 10);
        return;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
};

module.exports = _;
