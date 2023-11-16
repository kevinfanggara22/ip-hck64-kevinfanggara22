const { User, Product } = require("../models");
const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");

let token;

beforeAll(async () => {
  const user = await User.create({
    email: "admin@mail.com",
    password: "mypassword123",
    role: "Admin",
  });
  token = createToken({ id: user.id });

  const values = [
    {
      title: "product 1",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    },
    {
      title: "product 2",
      description: "content",
      price: 150000,
      stock: 1,
      imageUrl: "image",
    },
  ];
  const products = await Product.bulkCreate(values);
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Product.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe.only("GET /products", () => {
  test("Successfully get all products", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(expect.any(Array));
  });

  describe("GET /products/:id", () => {
    test("Successfully get products details", async () => {
      const response = await request(app).get("/products/1");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("name", expect.any(String));
      expect(response.body).toHaveProperty("description", expect.any(String));
      expect(response.body).toHaveProperty("imageUrl", expect.any(String));
      expect(response.body).toHaveProperty("createdAt", expect.any(String));
      expect(response.body).toHaveProperty("updatedAt", expect.any(String));
    });
    test("Get product detail failed because product ID is either invalid or not in the database", async () => {
      const response = await request(app).get("/products/99");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", `Error Not Found`);
    });
  });
});
