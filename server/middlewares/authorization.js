const authorizationAdmin = async (req, res, next) => {
  try {
    // console.log(req.user, "user")
    // console.log(req.params)
    // const {id} = req.params
    if (req.user.role === "Admin") {
      next();
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
