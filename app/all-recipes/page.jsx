'use client'
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const AllRecipes = () => {

  const {data, isLoading, error} = useQuery({
    queryKey: ["all_recipes"],
    queryFn: ()=>HttpKit.filterByArea("Indian"),
  })

  useEffect(()=>{
    console.log(data)
  },[data])


  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto">
        <h1 className="text-4xl">This is the all recipes page</h1>
      </div>
    </div>
  );
};

export default AllRecipes;
