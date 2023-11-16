import axios from "axios"

export default function ButtonMidtrans({grossAmount, productId, quantity, status}) {

    const handleCheckout = async () => {

        try {
            const {data} = await axios({
                method: "POST",
                url: "http://localhost:3000/payment/midtrans/token" ,
                 headers: {
                    Authorization: 'Bearer ' + localStorage.access_token
                }, 
                data: {
                    grossAmount,
                    productId,
                    quantity,
                    status
                }
            })
               
            console.log(data.transaction_token)

            window.snap.pay(`${data.transaction_token}`, {
          onSuccess: function(result){
            /* You may add your own implementation here */
            alert("payment success!"); console.log(result);
          },
          onPending: function(result){
            /* You may add your own implementation here */
            alert("wating your payment!"); console.log(result);
          },
          onError: function(result){
            /* You may add your own implementation here */
            alert("payment failed!"); console.log(result);
          },
          onClose: function(){
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment');
          }
      });
        } catch(error) {
            console.log(error)
        }
    }

    return(
         <button onClick={handleCheckout}>Checkout</button>
    )
   
}