'use client'

import loginChecker from "@/common/helpers/loginChecker";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { Notyf } from 'notyf'; 
import { useNav } from "@/providers/NavContext";


const Login = () => {
  const {setReloader} = useNav();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  

  const router = useRouter();

  useEffect(() => {
    

    async function isLoggedIn() {
      const isLoggedIn = await loginChecker();
      if (isLoggedIn) router.push('/');
    }

    isLoggedIn();

  }, [router]);

  const uploadAllLocalCartToServer = () => {
    // let notyf =  new Notyf({
    //   duration: 3000,  
    //   position: { x: 'right', y: 'top' }, 
    //   ripple: true, 
    // });

    const userEmail = localStorage.getItem('userEmail');
    const offLineCart = localStorage.getItem('cart');
    const offLineCartObj = JSON.parse(offLineCart);

    const keysOfTheCartList = Object.keys(offLineCartObj ?? {});
    keysOfTheCartList && keysOfTheCartList.forEach(async (item) => {
      const data = offLineCartObj[item];
      const res = await fetch(`/api/cartlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, id: item, data })
      });
    })

    localStorage.removeItem('cart');
    // notyf.success('All local data uploaded to server'); // Success notification
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // notyf.success('Login successful'); // Success notification
        // Store token in local storage for further authentication
        console.log(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data?.user?.name);
        localStorage.setItem('userEmail', data?.user?.email);
        uploadAllLocalCartToServer();
        
        router.push('/');
        
      } else {
        // notyf.error(data.message); // Error notification
        alert('Mail or password is wrong !')
      }
      setLoading(false);

    } catch(err){
      console.log(err);
      alert('something is wrong');
      setLoading(false);
    }

    setTimeout(()=>{
      setReloader();
    },500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg shadow-yellow-100">
        <h2 className="text-2xl font-bold text-yellow-900 text-center mb-6">
          Welcome Back to Tailus <span className="text-yellow-700">Feedus</span>
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
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
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border border-yellow-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 mt-4 text-center rounded-full bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {loading ? 'Logging in...' : 'Log in'}
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
