const { User } = require("../models");

const authorizationAdmin = async (req, res, next) => {
  try {

    const selectedUser = await User.findOne({
        where: req.body.email
    });
    if (!selectedUser) {
      throw { name: "DataNotFound" };
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authorizationAdmin,
};
