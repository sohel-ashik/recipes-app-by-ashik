'use client'

import loginChecker from "@/common/helpers/loginChecker";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useNav } from "@/providers/NavContext";

const Navbar = () => {
  const {cartCount, valueChanger, setReloader} = useNav();

  const navCheckboxRef = useRef(null);
  const pathName = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const handleModalDisapear  = () => {
    setTimeout(() => {
      if (navCheckboxRef.current) {
        navCheckboxRef.current.checked = false;
      }
    }, 200); 
  };

  const handleLogOut = () => {
    handleModalDisapear();
    setLoggedIn(false);
    localStorage.setItem('token', "");
    localStorage.setItem('userName', "");
    localStorage.setItem('userEmail', "");
    router.push('/')
    window.location.reload();
  }

  useEffect(()=>{
    const isLoggedIn =  loginChecker();
    setLoggedIn(isLoggedIn);
  },[pathName])


  return (
    <nav className="fixed z-30 w-full bg-yellow-50 md:absolute border-b-2 border-blue-30">
      <div className="container m-auto px-2 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <input
            type="checkbox"
            name="toggle_nav"
            id="toggle_nav"
            className="peer hidden"
            ref={navCheckboxRef}
          />
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
            <Link
              href="/"
              aria-label="logo"
              className="flex space-x-2 items-center"
              onClick={handleModalDisapear}
            >
              <span className="text-2xl font-bold text-yellow-900 ">
                Tailus <span className="text-yellow-700 ">Feedus</span>
              </span>
            </Link>

            <div className="flex items-center lg:hidden max-h-10">
              <label
                role="button"
                htmlFor="toggle_nav"
                aria-label="hamburger"
                id="hamburger"
                className="relative w-10 h-auto p-2"
              >
                <div
                  id="line"
                  className="m-auto h-0.5 w-6 rounded bg-yellow-900  transition duration-300"
                ></div>
                <div
                  id="line2"
                  className="m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900  transition duration-300"
                ></div>
              </label>
            </div>
          </div>

          <label
            role="button"
            htmlFor="toggle_nav"
            className="hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-yellow-200  bg-opacity-30 backdrop-blur backdrop-filter"
          ></label>
          <div className="hidden peer-checked:flex w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-white  lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
            <div className="text-gray-600 lg:pr-4 w-full">
              <ul className="tracking-wide font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                <li>
                  <Link
                    href="/all-recipes"
                    className={`block md:px-4 transition ${pathName.includes('all-recipes') ? 'text-yellow-600' : ''} hover:text-yellow-700`}
                    onClick={handleModalDisapear}
                  >
                    <span>All recipes</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className={`block md:px-4 transition hover:text-yellow-700 ${pathName.includes('cart') ? 'text-yellow-600' : ""}`}
                    onClick={handleModalDisapear}
                  >
                    <span>Cart</span>
                    {cartCount ? <span className="ml-1 bg-green-700 text-white px-2 py-1 rounded-full">{cartCount}</span> : null}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full min-w-max space-y-2 border-yellow-200 lg:space-y-0 sm:w-max lg:border-l ">
            {!loggedIn ? <>
              <Link href='/signup'  onClick={handleModalDisapear}>
                <button
                  type="button"
                  title="Start buying"
                  className={`w-full lg:ml-2 py-3 px-6 text-center rounded-full transition ${pathName.includes('signup') ? 'bg-yellow-300' : ''} hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max border border-yellow-300`}
                >
                  <span className="block text-yellow-800 font-semibold text-sm">
                    Sign up
                  </span>
                </button>
              </Link>
              <Link href='/login'  onClick={handleModalDisapear}>

                <button
                  type="button"
                  title="Start buying"
                  className={`w-full py-3 px-6 text-center rounded-full transition ${pathName.includes('login') ? 'bg-yellow-300' : ''} hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max border border-yellow-300 mt-2 lg:mt-0 lg:ml-2`}
                >
                  <span className="block text-yellow-900 font-semibold text-sm">
                      Login
                  </span>
                </button>
              </Link></> : 
                <div>
                    <div className="flex flex-col md:flex-row items-center gap-2">
                      <div className="pl-3">{localStorage.getItem('userName')}</div>
                      
                          <button
                          onClick={handleLogOut}
                            type="button"
                            title="Start buying"
                            className={`w-full py-3 px-6 text-center rounded-full transition ${pathName.includes('login') ? 'bg-yellow-300' : ''} hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max border border-yellow-300 mt-2 lg:mt-0 lg:ml-2`}
                          >
                            <span className="block text-yellow-900 font-semibold text-sm">
                                Logout
                            </span>
                          </button>
                      
                    </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
