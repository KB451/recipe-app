import React from 'react';
import { Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import RecipeList from "./Recipes/RecipeList"
import Recipe from "./Recipes/RecipeDetails/Recipe";
import ShoppingList from "./Recipes/ShoppingList/ShoppingList";
import UseLocalStorage from "./Recipes/Inputs/UseLocalStorage";
import '../Styles/_app.scss';


function App() {

  /* OLD CODE
  //USE LOCAL STORAGE TO GET RECIPES AND SHOPPING LIST ITEMS
  const initialRecipes = JSON.parse(window.localStorage.getItem("recipes") || "[]")
  const initialItems = JSON.parse(window.localStorage.getItem("items") || "[]")
  
  //SET RECIPES AND ITEMS FROM LOCAL STORAGE AS INITIAL DATA
  const [recipes, setRecipes] = useState(initialRecipes)
  const [items, setItems] = useState(initialItems) 

  //ANY CHANGES MADE TO RECIPES OR ITEMS WILL BE SAVED IN LOCAL STORAGE
  useEffect(() => {
    window.localStorage.setItem("recipes", JSON.stringify(recipes))
    window.localStorage.setItem("items", JSON.stringify(items))
  }, [recipes, items]) 

  CREATED "UseLocalStorage.js" FILE TO BOTH GET AND SET DATA IN LOCAL STORAGE

  ################################################################# */
  
  //VARIABLE ASSIGNED ARRAY WITH INITIAL VALUES OF RECIPE CATEGORIES THAT USER CAN CHOOSE FROM 
  const ctgyList = [
    {category: "-- Select Category --", id: uuidv4()},
    {category: "Appetizers", id: uuidv4()},
    {category: "Soups & Salads", id: uuidv4()},
    {category: "Main Dishes: Meat", id: uuidv4()},
    {category: "Main Dishes: Vegetarian", id: uuidv4()},
    {category: "Sides", id: uuidv4()},
    {category: "Desserts", id: uuidv4()},
    {category: "Beverages", id: uuidv4()},
  ]
   
  /* REPLACED ABOVE OLD CODE WITH THIS:  
  "UseLocalStorage.js" FILE HAS TWO FUNCTIONS - ONE RETRIEVES DATA FROM LOCAL STORAGE
  AND THE OTHER SAVES DATA */    
  const [categories, setCategories] = UseLocalStorage("categories", ctgyList)  
  const [recipes, setRecipes] = UseLocalStorage("recipes", [])
  const [items, setItems] = UseLocalStorage("items", [])  
  
  //USE ROUTES TO LINK EACH RECIPE TO MAIN PAGE AND INGREDIENTS TO SHOPPING LIST COMPONENT
  return (
    <Routes>
      <Route path="/*" element={<RecipeList recipes={recipes} setRecipes={setRecipes} categories={categories} updateCategories={setCategories}/>}/>
      <Route path="/recipe/:id" element={<Recipe details={recipes} updateDetails={setRecipes} categories={categories} updateCategories={setCategories} shoppingItems={items} updateShoppingList={setItems}/>}/>                
      <Route path="/shopping-list" element={<ShoppingList items={items} setItems={setItems} listOfRecipes={recipes} updateListOfRecipes={setRecipes}/>}/>
    </Routes>  
  );
}

export default App;
