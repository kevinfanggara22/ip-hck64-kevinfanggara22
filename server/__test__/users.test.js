const { User } = require("../models");
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
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /login", () => {
  test("Successfully login", async () => {
    const admin = {
      email: "admin@mail.com",
      password: "mypassword123",
    };
    const response = await request(app).post("/login").send(admin);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", token);
  });
  test("Email empty", async () => {
    const admin = {
      password: "mypassword123",
    };
    const response = await request(app).post("/login").send(admin);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Please input email");
  });
  test("Password empty", async () => {
    const admin = {
      email: "admin@mail.com",
    };
    const response = await request(app).post("/login").send(admin);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Please input password");
  });
  // test("Email invalid / not found", async () => {
  //   const admin = {
  //     email: "administrator@mail.com",
  //     password: "mypassword123",
  //   };
  //   const response = await request(app).post("/login").send(admin);
  //   expect(response.status).toBe(401);
  //   expect(response.body).toBeInstanceOf(Object);
  //   expect(response.body).toHaveProperty("message", "User Not Authorized");
  // });
  // test("Wrong password / not match", async () => {
  //   const admin = {
  //     email: "admin@mail.com",
  //     password: "mypassword",
  //   };
  //   const response = await request(app).post("/login").send(admin);
  //   expect(response.status).toBe(401);
  //   expect(response.body).toBeInstanceOf(Object);
  //   expect(response.body).toHaveProperty("message", "User Not Authorized");
  // });
});

describe("POST /register", () => {
  test("Register success", async () => {
    const addUser = {
      email: "test@mail.com",
      password: "12345",
    };
    const response = await request(app)
      .post("/register")
      .send(addUser)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `User with email ${addUser.email} has been created`
    );
  });
  test("Email field empty", async () => {
    const addUser = {
      password: "mypassword123",
    };
    const response = await request(app)
      .post("/register")
      .send(addUser)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Please input email`);
  });
  test("Password field empty", async () => {
    const addUser = {
      email: "staff@mail.com",
    };
    const response = await request(app)
      .post("/register")
      .send(addUser)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Please input password`);
  });
  test("Email input is empty string", async () => {
    const addUser = {
      email: "",
      password: "mypassword123",
    };
    const response = await request(app)
      .post("/register")
      .send(addUser)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Please input email`);
  });
  // test("Email has been registered", async () => {
  //   const addUser = {
  //     email: "admin@mail.com",
  //     password: "mypassword123",
  //   };
  //   const response = await request(app)
  //     .post("/register")
  //     .send(addUser)
  //     .set("Authorization", "Bearer " + token);

  //   expect(response.status).toBe(400);
  //   expect(response.body).toBeInstanceOf(Object);
  //   expect(response.body).toHaveProperty("message", `email must be unique`);
  // });
//   test("Wrong email format", async () => {
//     const addUser = {
//       email: "adminmail",
//       password: "mypassword123",
//     };
//     const response = await request(app)
//       .post("/register")
//       .send(addUser)
//       .set("Authorization", "Bearer " + token);

//     expect(response.status).toBe(400);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty(
//       "message",
//       `Please input email format`
//     );
//   });
});
