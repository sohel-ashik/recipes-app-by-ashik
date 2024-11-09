'use client';

import Link from "next/link";
import React from "react";

const Signup = () => {

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('here')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg shadow-yellow-100">
        <h2 className="text-2xl font-bold text-yellow-900 text-center mb-6">
          Create an Account on Tailus <span className="text-yellow-700">Feedus</span>
        </h2>
        <form onSubmit={(e)=>submitHandler(e)} className="space-y-4">
          <div>
            {/* <label htmlFor="name" className="block text-sm text-yellow-900 font-semibold">
              Name
            </label> */}
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-1 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            {/* <label htmlFor="email" className="block text-sm text-yellow-900 font-semibold">
              Email
            </label> */}
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            {/* <label htmlFor="phone" className="block text-sm text-yellow-900 font-semibold">
              Phone
            </label> */}
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 mt-1 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div>
            {/* <label htmlFor="password" className="block text-sm text-yellow-900 font-semibold">
              Password
            </label> */}
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Create a password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-center rounded-full bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-yellow-700">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-900 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;