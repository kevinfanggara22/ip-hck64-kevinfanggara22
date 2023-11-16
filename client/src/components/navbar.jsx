import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dpzk5shad/image/upload/v1700105360/szxguewlwhanjrwtmnfc.png"
              className="h-6"></img>
          </Link>
          <div className="flex flex-col p-4 md:p-0 mt-4 font-medium md:mt-0 md:border-0 md:bg-white">
            <a>
              <Link
                to="/login"
                className="py-2 pl-3 pr-4 bg-transparent text-sky-800 p-0"
                aria-current="page">
                Login
              </Link>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
