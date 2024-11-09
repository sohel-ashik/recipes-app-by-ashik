
'use client';
import RecipeCard from "@/components/Recipes/RecipeCard";
import HomePageTopReciepeSkeleton from "@/components/Skeleton/HomePageTopReciepeSkeleton";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import SingleRecipe from "@/components/Recipes/SingleRecipe";
  


const Cart = () => {
  const [cartList, setCartList] = useState({});
  const [loading, setLoading] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  const removeFromTheCartList = (id) => {
    const newItems = cartList?.filter(item => item.idMeal !== id);
    setCartList(newItems);
  }

  useEffect(()=>{
    async function getCartList() {
        try{
          setLoading(true);
          const userEmail = localStorage.getItem('userEmail');
          const res = await fetch(`/api/cartlist?userEmail=${userEmail}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await res.json();
          if(data && data?.cartList){
            setCartList(Object.values(data?.cartList));
            console.log(data.cartList)
          }
          setLoading(false);
        } catch(err){
          console.log(err);
          setCartList(false);
        }
    }
    
    getCartList();

  },[])


  return (
    <div className="bg-gray-50 min-h-screen flex ">
      <div className="container mx-auto pt-24 ">
        <div className="text-center font-bold  text-3xl">Cart</div>
        {/* Cart page */}
        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {cartList?.length > 0 && (
                cartList.map((recipe) => (
                  <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    handleDetailsOpen={() =>{handleDetailsOpen(recipe.idMeal)}}
                  />
                ))
              )}
            </div>
            {!loading && !cartList?.length && <div className="w-full text-center">No cart here.</div>
            }
            {  loading &&
              <div>
                <HomePageTopReciepeSkeleton/>
              </div>}
          </div>
        </div>
      </div>
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} removeFromTheCartList={removeFromTheCartList}/>
      </Modal>
    </div>
  );
};

export default Cart;
