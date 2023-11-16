const { Product } = require("../models/index");
const cloudinary = require("cloudinary").v2;
const uploadImage = require("../helpers/multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class AdminController {
  static async listProduct(req, res, next) {
    try {
      const data = await Product.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Product.findOne({
        where: { id },
      });
      if (!data) {
        throw { name: "DataNotFound" };
      } else {
        await Product.destroy({
          where: { id },
          returning: true,
        });
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const { name, description, price, stock } = req.body;
      const imageUrl = await uploadImage(req.file);
      const data = await Product.create({
        name,
        description,
        price,
        stock,
        imageUrl,
      });
      console.log(data);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.body;
      const data = await Product.findByPk(id);
      if (!data) {
        throw { name: "DataNotFound" };
      } else {
        let updatedData;
        if (!req.file) {
          updatedData = await Product.update(
            {
              name: name,
              description: description,
              price: price,
              stock: stock,
            },
            {
              where: { id },
              returning: true,
            }
          );
        } else {
          const imageUrl = await uploadImage(req.file);
          updatedData = await Product.update(
            {
              name: name,
              description: description,
              price: price,
              stock: stock,
              imageUrl: imageUrl,
            },
            {
              where: { id },
              returning: true,
            }
          );
        }
        res.status(200).json(updatedData);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AdminController;
