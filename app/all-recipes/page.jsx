'use client';
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/Recipes/RecipeCard"; 
import HomePageTopReciepeSkeleton from "@/components/Skeleton/HomePageTopReciepeSkeleton";
import Modal from "../../components/Modal"
import SingleRecipe from "@/components/Recipes/SingleRecipe";

const AllRecipes = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("Indian");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  
  const { data: categories } = useQuery({
    queryKey: ["categories"], 
    queryFn: HttpKit.getCategories
  });
  const { data: areas } = useQuery({
    queryKey: ["areas"],
    queryFn: HttpKit.getAreas
  });

  const { data: recipes, isLoading: areaRecipesIsLoading } = useQuery({
    queryKey: ["all_recipes", selectedArea],
    queryFn: () => HttpKit.filterByArea(selectedArea),
    enabled: !!selectedArea
  });

  const { data: categoryRecipes, isLoading: categoryRecipesIsLoading } = useQuery({
    queryKey: ["filtered_category", selectedCategory],
    queryFn: () => selectedCategory ? HttpKit.filterByCategory(selectedCategory) : null,
    enabled: !!selectedCategory,
  });

  useEffect(() => {
    const filtered = (selectedCategory ? categoryRecipes : recipes) || [];
    setFilteredRecipes(
      filtered.filter(recipe => 
        recipe.strMeal.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [recipes, categoryRecipes, searchInput, selectedCategory]);

  const handleSearchChange = (e) => setSearchInput(e.target.value);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedArea("");  
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSelectedCategory("");
  };

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  // if (isLoading) return <div><HomePageTopReciepeSkeleton/></div>

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto">
        <div className="flex  justify-center flex-col lg:flex-row items-center gap-4 mb-10 lg:px-4 px-10">
          <input
            type="text"
            placeholder="Search for a recipe"
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full lg:w-1/3 p-4 rounded-lg border border-yellow-200 shadow-md"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full lg:w-1/4 p-4 rounded-lg border border-yellow-200 shadow-md"
          >
            <option value="" disabled>All Categories</option>
            {categories?.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
          <select
            value={selectedArea}
            onChange={handleAreaChange}
            className="w-full lg:w-1/4 p-4 rounded-lg border border-yellow-200 shadow-md"
          >
            <option value="" disabled>All Areas</option>
            {areas?.map((area) => (
              <option key={area.strArea} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </select>
        </div>

        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {filteredRecipes.length > 0 && (
                filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    handleDetailsOpen={() => handleDetailsOpen(recipe.idMeal)}
                  />
                ))
              )}
            </div>
            {!categoryRecipesIsLoading && !areaRecipesIsLoading && !filteredRecipes.length && <div className="w-full text-center">No result found</div>
            }
            {  (categoryRecipesIsLoading || areaRecipesIsLoading) &&
              <div>
                {console.log(categoryRecipesIsLoading,areaRecipesIsLoading, filteredRecipes.length)}
                <HomePageTopReciepeSkeleton/>
              </div>}
          </div>
        </div>
      </div>
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </div>
  );
};

export default AllRecipes;
