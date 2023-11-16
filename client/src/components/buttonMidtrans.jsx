/* eslint-disable react/prop-types */
import axios from "axios";

export default function ButtonMidtrans({
  grossAmount,
  productId,
  quantity,
  status,
}) {
  const handleCheckout = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/payment/midtrans/token",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
        data: {
          grossAmount,
          productId,
          quantity,
          status,
        },
      });

      console.log(data.transaction_token);

      window.snap.pay(`${data.transaction_token}`, {
        onSuccess: async function (result) {
          /* You may add your own implementation here */
          try {
            await axios({
              method: "POST",
              url: "http://localhost:3000/order",
              headers: {
                Authorization: "Bearer " + localStorage.access_token,
              },
              data: {
                grossAmount,
                productId,
                quantity,
                status
              },
            });
            alert("payment success!");
          console.log(result);
          } catch(error) {
            console.log(error)
          }
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("wating your payment!");
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="flex ml-auto text-white bg-sky-700 border-0 py-2 px-6 focus:outline-none hover:bg-sky-800 rounded">
      Buy Now
    </button>
  );
}
