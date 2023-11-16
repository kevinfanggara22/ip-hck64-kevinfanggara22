import { createBrowserRouter, redirect } from "react-router-dom";
import Homepage from "./views/homepage";
import LoginPage from "./views/login";
import RegisterPage from "./views/register";
import ProductDetails from "./views/productDetails";

const userAuthenticated = () => {
  // console.log(window.location.url, "url");
  if (!localStorage.access_token) {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
    loader: userAuthenticated,
  },
  //   {
  //     path: "/dashboard",
  //     element: <Dashboard />
  //   }
]);

export default router;
