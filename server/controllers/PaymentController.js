const midtransClient = require("midtrans-client");
const randomstring = require("randomstring");
const { Order } = require("../models/index");

class PaymentController {
  static async getMidtransToken(req, res, next) {
    try {
      // Create Snap API instance
      const snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      const orderId = `trx-${randomstring.generate()}`;
      const orderData = await Order.create({
        UserId: req.user.id,
        ProductId: req.body.productId,
        quantity: req.body.quantity,
        amount: req.body.grossAmount,
        status: req.body.status
      },)
      console.log("UserId " + req.user.id)
      console.log("ProductId " + req.body.id);
      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: req.body.grossAmount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
          phone: req.user.phoneNumber,
          address: req.user.address,
        },
      };
      // console.log(transaction_details);
      snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        // console.log("transactionToken:", transactionToken);
        res.json({ transaction_token: transactionToken, orderId });
      });
    } catch (error) {
      // console.log(error)
      next(error);
    }
  }
}

module.exports = PaymentController;
