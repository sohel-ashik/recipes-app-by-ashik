// app/context/NavContext.js
'use client'
import { createContext, useContext, useEffect, useState } from "react";

const NavContext = createContext();

export const useNav = () => useContext(NavContext);

export const NavProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [reloader, setReloader] = useState(0);

  const valueChanger = (value) => {
    setCartCount(pre=> pre + value);
  }

  useEffect(()=>{
    async function getAllCartList() {
        const userEmail = localStorage.getItem('userEmail');
        if(userEmail){
            const res = await fetch(`/api/cartlist?userEmail=${userEmail}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if(data && data?.cartList){
                const length = Object.keys(data?.cartList).length;
                
                setCartCount(length);
            }
        } else{
            const offLineCart = localStorage.getItem('cart');
            const offLineCartObj = JSON.parse(offLineCart)
            if(offLineCartObj){
              setCartCount(Object.values(offLineCartObj).length);
            }
        }
    }

    getAllCartList();

  },[reloader])

  return (
    <NavContext.Provider value={{ cartCount, valueChanger, setReloader: () => setReloader(pre=>!pre) }}>
      {children}
    </NavContext.Provider>
  );
};
