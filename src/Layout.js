import React, {useState} from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {

  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <nav className=" rounded-lg shadow dark:bg-green-800 m-4">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/G.png" className="h-16" alt="G Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-yellow-600">Events</span>
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" >
            <ul className="font-medium flex flex-col p-4 md:px-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              <li>
                <Link to="/" className="block py-2 px-3 text-lg text-green-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-yellow-600 dark:hover:text-white" aria-current="page">
                  Home</Link>
              </li>
              {
                isAdmin &&(
                  <li>
                  <Link to="addevent" className="block py-2 px-3 text-lg text-green-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-yellow-600 dark:hover:text-white">
                    Add Event
                  </Link>
                </li>
                )
              }
              <li>
                <Link to="/register" className="block py-2 px-3 text-lg text-green-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-yellow-600 dark:hover:text-white">
                  Register</Link>
              </li>
              <li>
                <Link to="login" className="block py-2 px-3 text-lg text-green-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-yellow-600 dark:hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="my-account" className="block py-2 px-3 text-lg text-green-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-yellow-600 dark:hover:text-white">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> 

      <div className='bg-gray-100 text-lg container mx-auto min-h-[90vh]'>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
        <ToastContainer />
        <Outlet />
      </div>
      <div>
        <footer className="rounded-lg shadow dark:bg-green-800 m-4">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
              <div className="sm:flex sm:items-center sm:justify-between">
              <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src="/G.png" className="h-16" alt="G Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-yellow-600">Events</span>
              </Link>
                  <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-yellow-600">
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">About</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Contact</a>
                      </li>
                  </ul>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <span className="block text-sm text-gray-500 sm:text-center dark:text-yellow-600">© 2024 <a href="#" className="hover:underline">G Events™</a>. All Rights Reserved.</span>
          </div>
      </footer>
     </div>

    </div>
  )
}
