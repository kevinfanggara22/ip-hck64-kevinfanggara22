const { Product } = require("../models/index");

class PublicController {
  static async allProducts(req, res, next) {
    try {
      const data = await Article.findAll();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async productDetails(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Product.findOne({
        where: { id },
      });
      if (!data) {
        throw { name: "DataNotFound" };
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = PublicController;
