import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-sky-800 shadow ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/">
            <span className="self-center text-white text-2xl font-semibold whitespace-nowrap">
              Fuel The Mule
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-white-sm font-medium text-gray-50 sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-50 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-50 sm:text-center">
          © 2023 Kevin F Anggara. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
