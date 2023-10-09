let _ = {};

_.name = () => {
  const regex = "[A-Za-z0-9]+";
  const constraints = {
    presence: {
      alowEmpty: false,
    },
    type: "string",
    format: {
      pattern: regex,
      flags: "i",
      message: "name must match the format pattern",
    },
  };
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

module.exports = _;
