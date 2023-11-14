const bcrypt = require("bcryptjs");

function hashPassword(plainPass) {
  return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(10));
}

function comparePassword(plainPass, hashPass) {
  return bcrypt.compareSync(plainPass, hashPass);
}

module.exports = {
  hashPassword,
  comparePassword,
};
