//이 constrains은 하나의 schema라고 생각하면 될 듯

let _ = {};

_.name = () => {
  const regex = /[A-Za-z0-9]+/;
  const constraints = {
    presence: {
      allowEmpty: false,
    },
    type: "string",
    format: {
      pattern: regex,
      flags: "i",
      message: "name must match the format pattern",
    },
  };

  // constraints 객체를 반환
  return constraints;
};

_.email = () => {
  const constraints = {
    presence: { allowEmpty: false },
    type: "string",
    email: true,
  };

  return constraints;
};

_.password = () => {
  const constraints = {
    presence: { allowEmpty: false },
    type: "string",
    length: {
      minimum: 10,
    },
  };
};

module.exports = _;
