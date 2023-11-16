import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Customer"
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

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      // axios
      const { data } = await axios.post("http://localhost:3000/register", form);
      console.log(data);

      // notif success register
      Swal.fire({
        icon: "success",
        title: "You have successfully register",
        showConfirmButton: false,
        timer: 1500,
      });

      // navigate
      navigate("/login");
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
                  Register an account
                </h1>
                <form
                  onSubmit={handleRegister}
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
                    Register
                  </button>
                  <div className="block mb-2 text-sm font-medium text-gray-500 text-center">
                    Or Register Using
                  </div>
                  <GoogleLogin
                    className="w-full"
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Register Failed");
                    }}
                  />
                </form>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-sky-800 hover:underline">
                    Login here
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
