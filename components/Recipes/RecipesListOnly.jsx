'use client'

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HomePageTopReciepeSkeleton from "../Skeleton/HomePageTopReciepeSkeleton";
import HttpKit from "@/common/helpers/HttpKit";
import RecipeCard from "./RecipeCard";

export default function RecipeListOnly({handleDetailsOpen, searchedData,searchLoading }){
    const [recipes, setRecipes] = useState([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ["recipes"],
        queryFn: HttpKit.getTopRecipes,
      });
    
      useEffect(() => {
        if (data) {
          setRecipes(data);
        }
      }, [data]);

      if (isLoading || searchLoading) return (
        <div className="mt-10">
           <HomePageTopReciepeSkeleton/>
        </div>
      );
      if (error) return <div>Error loading recipes: {error.message}</div>;


    return (
        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {searchedData ?  searchedData?.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  handleDetailsOpen={handleDetailsOpen}
                />
              )) : recipes?.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  handleDetailsOpen={handleDetailsOpen}
                />
              ))}
            </div>
            {searchedData && searchedData.length === 0 && <div className="w-full text-center">No data found.</div>}
          </div>
        </div>
    )
}