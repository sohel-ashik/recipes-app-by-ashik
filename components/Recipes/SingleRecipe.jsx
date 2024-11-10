'use client';

import HttpKit from "@/common/helpers/HttpKit";
import { useNav } from "@/providers/NavContext";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SingleRecipe = ({ id, setIsOpen, removeFromTheCartList}) => {
  const [isAdded, setIsAdded] = useState(false);
  const {setReloader} = useNav();

  const [statusChanged, setStatusChanged] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details"],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });

  const handleAddToCart = async (data,id)=>{
    const userEmail = localStorage.getItem('userEmail');
    const {idMeal,strMeal, strMealThumb} = data;

    if(userEmail){
      const res = await fetch(`/api/cartlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userEmail, id , data: {idMeal,strMeal, strMealThumb} })
      });
      setStatusChanged(pre=>!pre);
    } else {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      cart[id] = { idMeal, strMeal, strMealThumb };
      localStorage.setItem('cart', JSON.stringify(cart));
      setStatusChanged(pre=>!pre);
    }
    setReloader();
  }

  const handleDeleteToCart = async (id)=>{
    const userEmail = localStorage.getItem('userEmail');
    if(userEmail){
      const res = await fetch(`/api/cartlist`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userEmail, id })
      });
      setStatusChanged(pre=>!pre);
    }else {
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (cart) {
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
        setStatusChanged(pre=>!pre);
      }
    }

    setReloader();

    removeFromTheCartList && removeFromTheCartList(id);
    removeFromTheCartList && setIsOpen(false);
  }

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    async function checklist(id) {
          const res = await fetch(`/api/checkcart?userEmail=${userEmail}&id=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          if(res.ok){
            const data = await res.json();
            if(data && data.found){
              setIsAdded(true);
            }else setIsAdded(false);
          } else {
            setIsAdded(false);
          }
      }

      if(userEmail){
        checklist(id);
      }else{
        const offLineCart = localStorage.getItem('cart');
        const offLineCartObj = JSON.parse(offLineCart)
        if(offLineCartObj){
          setIsAdded(offLineCartObj[id] ? true : false);
        }
      }
      

  }, [data, statusChanged]);

  if (isLoading) return <p className="text-center text-yellow-900">Loading...</p>;

  return (
    <div className="fixed top-10 inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto max-h-[85vh] relative">

        {/* Cart Button */}
        {isAdded ? <button 
          // onClick={() => handleAddToCart(data, id)} 
          onClick={()=>handleDeleteToCart(id)}
          className="absolute top-4 left-4 bg-green-900 text-white p-2 rounded-lg px-4 shadow-md hover:bg-green-700 transition duration-200"
        >
          Remove -
        </button>: 
        <button 
          onClick={() => handleAddToCart(data, id)} 
          // onClick={()=>handleDeleteToCart(id)}
          className="absolute top-4 left-4 bg-yellow-900 text-white p-2 rounded-lg px-4 shadow-md hover:bg-yellow-700 transition duration-200"
        >
          Add to Cart +
        </button>
      }

        {/* Close Button */}
        <div className="flex justify-end">
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-yellow-900 hover:text-yellow-700 text-xl font-semibold"
          >
            ✕
          </button>
        </div>

        {/* Recipe Image */}
        <div className="flex justify-center mb-4 mt-4">
          <Image 
            src={data?.strMealThumb} 
            width={400} 
            height={300} 
            alt={data?.strMeal} 
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Recipe Title */}
        <h2 className="text-2xl font-bold text-yellow-900 text-center mb-4">
          {data?.strMeal}
        </h2>

        {/* Ingredients List */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-yellow-900">Ingredients</h3>
          <ul className="mt-2 text-gray-700 space-y-1">
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .map((num) => ({
                ingredient: data?.[`strIngredient${num}`],
                measure: data?.[`strMeasure${num}`],
              }))
              .filter((item) => item.ingredient && item.measure)
              .map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.ingredient}</span>
                  <span>{item.measure}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-yellow-900">Instructions</h3>
          <p className="mt-2 text-gray-700 leading-relaxed">
            {data?.strInstructions}
          </p>
        </div>

        {/* YouTube Link */}
        {data?.strYoutube && (
          <div className="mt-4 text-center">
            <a
              href={data.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-900 hover:text-yellow-700 font-semibold underline"
            >
              Watch Recipe Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRecipe;
