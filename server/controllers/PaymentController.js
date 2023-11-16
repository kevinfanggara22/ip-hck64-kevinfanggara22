class PaymentController {
    static async getMidtransToken(req,res,next) {
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
              res.status(200).json({transaction_token: transactionToken});
            });
        } catch(error) {
            console.log("Midtrans error: " + error)
        }
    }
}

module.exports = PaymentController