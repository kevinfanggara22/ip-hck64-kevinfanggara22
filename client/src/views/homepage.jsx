import Navbar from "../components/navbar"
import Footer from "../components/footer"
import ProductCard from "../components/productCards";

export default function Homepage() {
    return (
      <>
        <Navbar />

        <div className="container mx-auto px-10 py-10 grid grid-cols-4 gap-4">
          <ProductCard />
        </div>

        <Footer />
      </>
    );
}