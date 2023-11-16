import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ButtonMidtrans from "../components/buttonMidtrans";


export default function ProductDetails() {
    const [productQuantity, setProductQuantity] = useState(null);

    const changeInput = (event) => {
    const {name, value} = event.target;
    setProductQuantity(() => {
      return {
        ...productQuantity,
        [name]: value
      }
    })
    console.log(productQuantity)
  }

    let { id } = useParams();

    let productId = id
    let quantity = 2
    let grossAmount = quantity * 150000
    let status = "paid"

    const fetchProductById = async () => {
      try{
        const {data} = await axios.get(
        "http://localhost:3000/products/" + id
        
      )
      console.log(data.price)
      setProductQuantity(data)
      } catch(error) {
        console.log(error)
      } 
    }

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(event)
    }

    useEffect(() => {
      if(id) {
        fetchProductById()
      }
    }, [])

    return (
        
       <form onSubmit={onSubmit}>
        <label>Quantity</label>
        <input
                    type="number"
                    name="quantity"
                    onChange={changeInput}
                    required=""
                />
        <ButtonMidtrans grossAmount={grossAmount} productId={productId} quantity={quantity} status={status}/>
       </form>
    )
}