const { Order } = require("../models/index");

class PaymentController {
  static async getMidtransToken(req, res, next) {
    try {
      const midtransClient = require("midtrans-client");
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: "trx-" + Date.now(),
          gross_amount: req.body.grossAmount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        console.log("transactionToken:", transactionToken);
        res.status(200).json({ transaction_token: transactionToken });
      });
    } catch (error) {
      console.log("Midtrans error: " + error);
    }
  }

  static async createOrder(req, res, next) {
    try {
      const { grossAmount, quantity, productId } = req.body;
      const data = await Order.create({
        UserId: req.user.id,
        ProductId: productId,
        quantity: quantity,
        amount: grossAmount,
        status: "paid"
      })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = PaymentController;
