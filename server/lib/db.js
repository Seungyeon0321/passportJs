let _ = class db {
  static localStorage = [];

  static write(data) {
    console.log(`Writing ${JSON.stringify(data)}`);
    if (data) {
      this.localStorage.push(data);
      return data;
    }
    return false;
  }

  static findOne(id) {
    if (id) {
      for (let record of this.localStorage) {
        if (record.id === id) {
          return record;
        }
      }
    }
    return false;
  }

  static findByEmail(email) {
    let user = false;
    console.log(this.localStorage);
    //받는 email이 우리가 가지고 있는 email가 동일한지 체크해야 한다.
    if (email) {
      for (let record of this.localStorage) {
        if (record.email === email) {
          user = record;
        }
      }
      return user;
    }
  }
};

module.exports = _;
