"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let orders = fs.readFileSync("./data/orders.json", "utf-8");
    orders = JSON.parse(orders);

    orders.forEach((order) => {
      order.createdAt = new Date();
      order.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Orders", orders);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
