import { useNavigate, Link } from "react-router-dom";
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
      const { data } = await axios.post(
        "https://p2.kevinfanggara.my.id/login",
        form
      );
      // console.log(data)
      // store access_token to local storage
      localStorage.access_token = data.access_token;
      //   console.log(data)

      // notif success login
      Swal.fire({
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
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dpzk5shad/image/upload/v1700105360/szxguewlwhanjrwtmnfc.png"
                    className="h-6"></img>
                </Link>
                <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900">
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                      placeholder="user@mail.com"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                      required=""
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-sky-700 hover:bg-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Sign In
                  </button>
                  <div className="block mb-2 text-sm font-medium text-gray-500 text-center">
                    Or Sign In Using
                  </div>
                  <div className="flex justify-center">
                    <GoogleLogin
                      className="w-full"
                      onSuccess={async (credentialResponse) => {
                        console.log(credentialResponse);
                        try {
                          const { data } = await axios.post(
                            "https://p2.kevinfanggara.my.id/google-sign-in",
                            {
                              googleToken: credentialResponse.credential,
                            }
                          );
                          localStorage.access_token = data.access_token;
                          navigate("/");
                        } catch (error) {
                          console.log(`google signin error: ${error}`);
                        }
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </div>
                </form>
                <p className="text-sm font-light text-gray-500">
                  Do not have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-sky-800 hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
