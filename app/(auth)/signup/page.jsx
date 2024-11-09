'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const router = useRouter();

  
  const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, phone, password }),
        });
  
        const data = await response.json();
        if (response.ok) {
          // setMessage(data.message);
          // Clear the form fields if registration is successful
          setEmail('');
          setName('');
          setPhone('');
          setPassword('');
          localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data?.user?.name);
          localStorage.setItem('userEmail', data?.user?.email);
          router.push('/');
        } else {
          alert("error to signup")
        }
      } catch (error) {
        alert("error to signup")
        console.error('Error during registration:', error);
      }
    };

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
              value={name}
              onChange={(e)=>setName(e.target.value)}
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
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
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
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
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
