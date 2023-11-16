if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const AuthController = require("./controllers/AuthController");
const PublicController = require("./controllers/PublicController");
const AdminController = require("./controllers/AdminController");
const PaymentController = require("./controllers/PaymentController");
const authentication = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");
const { authorizationAdmin } = require("./middlewares/authorization");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const cors = require("cors");

const app = express();

app.use(cors());

// Middleware for body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Show all products for public
app.get("/products", PublicController.allProducts);

// Show product details
app.get("/products/:id", PublicController.productDetails);

// User login using email & password
app.post("/login", AuthController.login);

// User register using email & password
app.post("/register", AuthController.register);

// Google login
app.post("/google-sign-in", AuthController.googleLogin);

// Auth middleware
app.use(authentication);

// Midtrans payment
app.post("/payment/midtrans/token", PaymentController.getMidtransToken);

// Show all products
app.get("/admin/products", authorizationAdmin, AdminController.listProduct);

// Create product
app.post(
  "/admin/products",
  authorizationAdmin,
  upload.single("imageUrl"),
  AdminController.createProduct
);

// Update product
app.put(
  "/admin/products/:id",
  authorizationAdmin,
  upload.single("imageUrl"),
  AdminController.updateProduct
);

// Delete product
app.delete(
  "/admin/products/:id",
  authorizationAdmin,
  AdminController.deleteProduct
);

// Error handler
app.use(errorHandler);

module.exports = app;
