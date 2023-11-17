const { User, Product } = require("../models");
const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const path = require("path");
const fs = require("fs");
const filePath = path.resolve(__dirname, "aminosaurus.png");
const imageBuffer = fs.readFileSync(filePath); // Buffer

let token;
let product;
let user;

beforeAll(async () => {
  user = await User.create({
    email: "admin@mail.com",
    password: "mypassword123",
    role: "Admin",
  });
  token = createToken({ id: user.id });
});

beforeEach(async () => {
  product = await Product.create({
    name: "product 1",
    description: "content",
    price: 100000,
    stock: 2,
    imageUrl: "image",
  });
});

afterEach(async () => {
  await Product.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
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

describe("POST /admin/products", () => {
  test("Successfully create a new product ", async () => {
    const product = {
      name: "product 1",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    const response = await request(app)
      .post("/admin/products")
      .send(product)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(201);
  });
  test("Failed create new product because not login", async () => {
    const article = {
      name: "product 1",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    const response = await request(app).post("/admin/products").send(article);

    expect(response.status).toBe(401);
  });
  test("Failed create new article because user token is invalid", async () => {
    const article = {
      name: "product 1",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    let wrongToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk4ODMwNTQ4fZ.dHvtDCcWNHCqVKoE6CIl2DqPN7iBhj4XUQAAWQh1x_M";
    const response = await request(app)
      .post("/admin/products")
      .send(article)
      .set("Authorization", "Bearer " + wrongToken);

    expect(response.status).toBe(401);
  });
  test("Field title is empty/null", async () => {
    const article = {
      name: "",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    const response = await request(app)
      .post("/admin/products")
      .send(article)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(400);
  });
  test("Field content is empty/null", async () => {
    const article = {
      name: "product 1",
      description: "",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    const response = await request(app)
      .post("/admin/products")
      .send(article)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(400);
  });
  //   test("Field categoryId is empty/null", async () => {
  //     const article = {
  //       title: "abcde",
  //       content: "fghij",
  //       imgUrl: "image",
  //       authorId: 1,
  //     };
  //     const response = await request(app)
  //       .post("/admin/products")
  //       .send(article)
  //       .set("Authorization", "Bearer " + token);

  //     expect(response.status).toBe(400);
  //     expect(response.body).toHaveProperty(
  //       "message",
  //       `Please input article category`
  //     );
  //   });
  // test('Gagal ketika authorId tidak sesuai (validation required)', async () => {
  //     const article = {
  //         "title": "abcde",
  //         "content": "fghij",
  //         "imgUrl": "image",
  //         "categoryId":1
  //     }
  //     const response = await request(app).post('/admin/products').send(article).set('Authorization', 'Bearer ' + token)

  //     expect(response.status).toBe(400);
  //     expect(response.body).toHaveProperty('message', `Please input article author`)
  // })
});

describe("GET /admin/products", () => {
  test("Successfully get all articles", async () => {
    const response = await request(app)
      .get("/admin/products")
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
  });
  test("Failed get all articles because user has not login", async () => {
    const response = await request(app).get("/admin/products");

    expect(response.status).toBe(401);
  });
  test("Failed get all articles because user token is invalid", async () => {
    let wrongToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk4ODMwNTQ4fZ.dHvtDCcWNHCqVKoE6CIl2DqPN7iBhj4XUQAAWQh1x_M";
    const response = await request(app)
      .get("/admin/products")
      .set("Authorization", "Bearer " + wrongToken);

    expect(response.status).toBe(401);
  });
});

describe("GET /admin/products/:id", () => {
  test("Successfully get article details with the given parameter ID", async () => {
    const response = await request(app)
      .get("admin/products/1")
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
  });
  test("Failed get article details because user has not login", async () => {
    const response = await request(app).get("/admin/products/1");

    expect(response.status).toBe(401);
  });
  test("Failed get article details because user token is invalid", async () => {
    let wrongToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk4ODMwNTQ4fZ.dHvtDCcWNHCqVKoE6CIl2DqPN7iBhj4XUQAAWQh1x_M";
    const response = await request(app)
      .get("/admin/products/1")
      .set("Authorization", "Bearer " + wrongToken);

    expect(response.status).toBe(401);
  });
  test("Failed get article details because article ID is either not in the database or invalid", async () => {
    const response = await request(app)
      .get("/admin/products/2")
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(404);
  });
});

describe("PUT /admin/products/:id", () => {
  test("Successfully update article details with the given parameter ID", async () => {
    const updateArticle = {
      name: "product 1",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    const response = await request(app)
      .put("/admin/products/1")
      .send(updateArticle)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
  });
  test("Failed update article details because user has not login", async () => {
    const updateArticle = {
      name: "product 1",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    const response = await request(app)
      .put("/admin/products/1")
      .send(updateArticle);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", `User must login`);
  });
  test("Failed update article details because user token is invalid", async () => {
    const updateArticle = {
      name: "product 1",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };

    let wrongToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk4ODMwNTQ4fZ.dHvtDCcWNHCqVKoE6CIl2DqPN7iBhj4XUQAAWQh1x_M";
    const response = await request(app)
      .put("/admin/products")
      .send(updateArticle)
      .set("Authorization", "Bearer " + wrongToken);

    expect(response.status).toBe(401);
  });
  test("Failed update article details because article ID is not in the database", async () => {
    const updateArticle = {
      name: "product 1",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    const response = await request(app)
      .put("/admin/products/2")
      .send(updateArticle)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(404);
  });
  test("Failed update article details because User Staff only have permission to update their article", async () => {
    const staff = await User.create({
      email: "staff@mail.com",
      password: "mypassword123",
      role: "Customer",
    });
    staffToken = createToken({ id: staff.id });

    const updateArticle = {
      name: "product 1",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    const response = await request(app)
      .put("/admin/products/1")
      .send(updateArticle)
      .set("Authorization", "Bearer " + staffToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Forbidden Access");
  });
  test("Failed update article details because title is empty/null", async () => {
    const updateArticle = {
      name: "product 1",
      description: "content",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    const response = await request(app)
      .put("/admin/products/1")
      .send(updateArticle)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(400);
  });
  test("Failed update article details because content is empty/null", async () => {
    const updateArticle = {
      name: "product 1",
      description: "",
      price: 100000,
      stock: 2,
      imageUrl: "image",
    };
    const response = await request(app)
      .put("/admin/products/1")
      .send(updateArticle)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(400);
  });
});

describe("DELETE /admin/products/:id", () => {
  test("Failed delete article because Staff does not have permission", async () => {
    staff = await User.create({
      email: "staff123@mail.com",
      password: "mypassword123",
      role: "Staff",
    });
    staffToken = createToken({ id: staff.id });

    const response = await request(app)
      .delete("/admin/products/1")
      .set("Authorization", "Bearer " + staffToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Forbidden Access");
  });
  test("Successfully delete article with the given parameter ID", async () => {
    const response = await request(app)
      .delete("/admin/products/1")
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
  });
  test("Failed delete article because user has not login", async () => {
    const response = await request(app).delete("/admin/products/1");

    expect(response.status).toBe(401);
  });
  test("Failed delete article because user token is invalid", async () => {
    let wrongToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk4ODMwNTQ4fZ.dHvtDCcWNHCqVKoE6CIl2DqPN7iBhj4XUQAAWQh1x_M";
    const response = await request(app)
      .delete("/admin/products/1")
      .set("Authorization", "Bearer " + wrongToken);

    expect(response.status).toBe(401);
  });
  test("Failed delete article because article id is not in the database", async () => {
    const response = await request(app)
      .delete("/admin/products/2")
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(404);
  });
});
