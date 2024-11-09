'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();


  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    console.log(response,'0')
    const data = await response.json();
    if (response.ok) {
      alert('Login successful');
      // Store token in local storage for further authentication
      console.log(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data?.user?.name);
      localStorage.setItem('userEmail', data?.user?.email);
      router.push('/');
    } else {
      alert(data.message);
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg shadow-yellow-100">
        <h2 className="text-2xl font-bold text-yellow-900 text-center mb-6">
          Welcome Back to Tailus <span className="text-yellow-700">Feedus</span>
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
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
            {/* <label htmlFor="password" className="block text-sm text-yellow-900 font-semibold">
              Password
            </label> */}
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-center rounded-full bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Log in
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-yellow-700">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-yellow-900 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
