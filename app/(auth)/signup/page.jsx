'use client'

import loginChecker from "@/common/helpers/loginChecker";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Import the Notyf CSS for styling
import { useNav } from "@/providers/NavContext";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const {setReloader} = useNav();

  const router = useRouter();

  // Create a Notyf instance
  // let notyf; 

  useEffect(() => {
    // notyf =  new Notyf();
    async function isLoggedIn() {
      const isLoggedIn = await loginChecker();
      if (isLoggedIn) router.push('/');
    }

    isLoggedIn();
  }, [router]);

  const uploadAllLocalCartToServer = () => {
    const userEmail = localStorage.getItem('userEmail');
    const offLineCart = localStorage.getItem('cart');
    const offLineCartObj = JSON.parse(offLineCart);

    const keysOfTheCartList = Object.keys(offLineCartObj ?? {});
    keysOfTheCartList.forEach(async (item) => {
      const data = offLineCartObj[item];
      await fetch(`/api/cartlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, id: item, data }),
      });
    });

    localStorage.removeItem('cart');
    // notyf.success('All local data uploaded to server');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, phone, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setEmail('');
        setName('');
        setPhone('');
        setPassword('');
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data?.user?.name);
        localStorage.setItem('userEmail', data?.user?.email);
        uploadAllLocalCartToServer();
        // notyf.success('Registration successful!');
        
        router.push('/');
      } else {
        console.log(response)
        // notyf.error('Error during signup!');
        alert('User exists')
      }
      setLoading(false);
    } catch (error) {
      // notyf.error('Error during signup!');
      setLoading(false);
      alert('Something is wrong')
    }
    setReloader();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg shadow-yellow-100">
        <h2 className="text-2xl font-bold text-yellow-900 text-center mb-6">
          Create an Account on Tailus <span className="text-yellow-700">Feedus</span>
        </h2>
        <form onSubmit={(e) => submitHandler(e)} className="space-y-4">
          <div>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-1 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 mt-1 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your phone number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-center rounded-full bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
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
