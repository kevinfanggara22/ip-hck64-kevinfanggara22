import { createBrowserRouter } from 'react-router-dom'
import Homepage from './views/homepage';
import LoginPage from './views/login'
import ProductDetails from './views/productDetails'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router