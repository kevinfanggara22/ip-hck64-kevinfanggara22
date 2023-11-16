import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const changeInput = (event) => {
    const { name, value } = event.target;
    setForm(() => {
      return {
        ...form,
        [name]: value,
      };
    });
    // console.log(form)
  };
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      // axios
      const { data } = await axios.post("http://localhost:3000/login", form);
      // console.log(data)
      // store access_token to local storage
      localStorage.access_token = data.access_token;
      //   console.log(data)

      // notif success login
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have successfully login",
        showConfirmButton: false,
        timer: 1500,
      });

      // navigate
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <section id="login" className="bg-sky-700">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign in to your account
                </h1>
                <form
                  onSubmit={handleLogin}
                  className="space-y-4 md:space-y-6"
                  id="login-form">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Your Email
                    </label>
                    <input
                      onChange={changeInput}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      onChange={changeInput}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required=""
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Sign In
                  </button>
                  <div className="block mb-2 text-sm font-medium text-gray-500 text-center">
                    Or Sign In Using
                  </div>
                  <GoogleLogin
                    className="w-full"
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
