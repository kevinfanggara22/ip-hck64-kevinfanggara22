import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {

    const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const changeInput = (event) => {
    const {name, value} = event.target;
    setForm(() => {
      return {
        ...form,
        [name]: value
      }
    })
    // console.log(form)
  }
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      // axios
      const {data} = await axios.post("http://localhost:3000/login", form)
      // console.log(data)
      // store access_token to local storage
      localStorage.access_token = data.access_token;
    //   console.log(data)

      // notif success login
      Swal.fire({
        icon: "success",
        title: "You have successfully login",
        showConfirmButton: false,
        timer: 1500
    });

      // navigate
      navigate('/')
    } catch(error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
    });
    }
  }

    return(
        <>
        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" id="login-form">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
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
                className="block mb-2 text-sm font-medium text-gray-900"
              >
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
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </form>

        <GoogleLogin
        onSuccess={credentialResponse => {
            console.log(credentialResponse);
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        />
        </>
    )
}