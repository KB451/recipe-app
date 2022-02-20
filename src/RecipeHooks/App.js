import React from 'react';
import { Routes, Route } from "react-router-dom";
import RecipeList from "./Recipes/RecipeList"
import Recipe from "./Recipes/Recipe"
import ShoppingList from "./Recipes/ShoppingList/ShoppingList"
import UseLocalStorage from "./Recipes/Inputs/UseLocalStorage"
import '../Styles/_app.scss';


function App() {

  /* TO REPLACE THE BELOW CODE:
  
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

  /* "UseLocalStorage.js" FILE HAS TWO FUNCTIONS - ONE RETRIEVES DATA FROM LOCAL STORAGE
  AND THE OTHER SAVES DATA */  
  const [recipes, setRecipes] = UseLocalStorage("recipes", [])
  const [items, setItems] = UseLocalStorage("items", [])  
  
  //USE ROUTES TO LINK EACH RECIPE TO MAIN PAGE AND INGREDIENTS TO SHOPPING LIST COMPONENT
  return (
    <Routes>
      <Route path="/*" element={<RecipeList recipes={recipes} setRecipes={setRecipes}/>}/>
      <Route path="/recipe/:id" element={<Recipe details={recipes} updateDetails={setRecipes} shoppingItems={items} updateShoppingList={setItems}/>}/>                
      <Route path="/shopping-list" element={<ShoppingList items={items} setItems={setItems} listOfRecipes={recipes} updateListOfRecipes={setRecipes}/>}/>
    </Routes>  
  );
}

export default App;
