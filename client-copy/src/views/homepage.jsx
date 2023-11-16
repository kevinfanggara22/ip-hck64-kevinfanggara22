import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ProductCard from "../components/productCards";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Homepage() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      let data = await axios({
        url: "http://localhost:3000/products",
        method: "GET",
      });
      console.log(data);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 px-10 pt-6">
          Showing All Products
        </h1>
      </div>

      <div className="mx-auto px-10 py-10 grid grid-cols lg:grid-cols-4 md:grid-cols-2 gap-4">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
      <Footer />
    </>
  );
}
