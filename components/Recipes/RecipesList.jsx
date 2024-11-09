"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import SingleRecipe from "./SingleRecipe";
import RecipeListOnly from "./RecipesListOnly";

const RecipesList = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  // const [searchQuery, setSearchQuery] = useState(null);

  const [searchedData, setSearchedData] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["search_recipes"],
    queryFn: ()=>HttpKit.searchRecipesByName(searchInput),
    enabled: false
  });

  const handleSearch = () => {
    if(searchInput){
      refetch();
    }
  };

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  useEffect(()=>{
    if(!searchInput){
      setSearchedData(null);
    } 
  },[searchInput])

  useEffect(()=>{
    if(data){
      setSearchedData([...data])
    }
  },[data])
  

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto">
        <div className="px-4 md:px-16">
        <h1 className="text-2xl pl-6 font-bold">Top Recipes</h1>
        {/* Search form */}
        <div>
          <form onSubmit={(e)=>e.preventDefault()} className="w-full  mt-6">
            <div className="relative flex p-1 rounded-full bg-white   border border-yellow-200 shadow-md md:p-2">
              <input
                placeholder="Your favorite food with name"
                className="w-full p-4 rounded-full outline-none bg-transparent "
                type="text"
                onChange={(e) =>
                  setSearchInput(e.target.value)
                }
                onKeyDown={(e)=>{
                  if(e.key === 'Enter'){
                    handleSearch();
                  }
                }}
              />
              <button
                onClick={() => handleSearch()}
                type="button"
                title="Start buying"
                className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
              >
                <span className="hidden text-yellow-900 font-semibold md:block">
                  Search
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 mx-auto text-yellow-900 md:hidden"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        </div>

        <RecipeListOnly searchedData={searchedData} searchLoading={isLoading} handleDetailsOpen={handleDetailsOpen}/>
      </div>

      {/* Modal*/}
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </div>
  );
};

export default RecipesList;
