import React from 'react';
import { useParams } from "react-router-dom";
import RecipeDetails from "./RecipeDetails"

/* PROPS PASSED FROM "App.js" - "details" AND "updateDetails" UPDATES "recipes" DATA. "shoppingItems" AND 
"updateShoppingList" UPDATES "items" DATA FROM "ShoppingList" COMPONENT. "Recipe" FUNCTION DISPLAYS THE "RecipeDetails" 
COMPONENT AND UPDATES "details" and "shoppingItems" WITH ANY USER CHANGES. */
function Recipe({categories, updateCategories, details, updateDetails, shoppingItems, updateShoppingList}) {
  //GRABS ID FROM THE RECIPE TITLE LINK
  let {id} = useParams() 
  //FILTERS "details" PROP THAT MATCHES WITH THE RECIPE LINK ID THAT USER CLICKED ON   
  let displayRecipe = details.filter(r => r.id === id)
  //IF USER EDITS A CATEGORY NAME, THIS FILTERS THE MOST CURRENT VERSION OF THAT NAME BASED OFF THE CATEGORY ID 
  let updatedCtgy = categories.filter(c => displayRecipe[0].ctgyId === c.id)
  
  //FUNCTION UPDATES RECIPE BASED ON USER CHANGES AND PASSES DATA TO "updateDetails" TO CHANGE "recipes"
  const updateRecipe = (recipeId, editedRecipe) => {
    const updatedRecipe = details.map(r => {
      if (r.id === recipeId) {
          return {...r, category: editedRecipe.category, ctgyId: editedRecipe.ctgyId, title: editedRecipe.title, ingredients: editedRecipe.ingredients, directions: editedRecipe.directions}
        }
          return r
      })
      updateDetails(updatedRecipe)
  }
  //FUNCTION FILTERS OUT DELETED RECIPE
  const removeRecipe = (id) => {
    updateDetails(details.filter(r => r.id !== id))
  }
  /* FUNCTION UPDATES INGREDIENTS ARRAY TO SHOW WHICH INGREDIENTS HAVE BEEN CHECKED OFF AND UPDATES THAT CHANGED STATE
  IN THE "ShoppingList" COMPONENT AS WELL */
  const checkIngredients = (recipeId, items, position, index) => { 
    //FUNCTION UPDATES INGREDIENTS ARRAY WITH CHANGED STATE OF CHECKBOX INPUT 
    const haveIngredients = details.map(r => {
      if (r.id === recipeId) {
          return {...r, ingredients: items}
        }
          return r
    })
    updateDetails(haveIngredients)
    //FUNCTION UPDATES SHOPPING LIST ITEMS TO REFLECT THE NEW STATE OF CHECKBOX INPUT
    const updateShoppedItems = shoppingItems.map(i => {        
        if (i.id === position) {
          return {...i, acquiredItem: items[index].haveItem}
        }
        return i
    })
    updateShoppingList(updateShoppedItems)      
  }   
  return (
    <div className="App">     
      {displayRecipe.map(r => (
        <RecipeDetails 
        key={r.id}
        id={r.id}
        //PASSES MOST CURRENT CTGY NAME TO "RecipeDetails" COMPONENT
        ctgy={updatedCtgy}
        title={r.title}
        ingredients={r.ingredients}
        directions={r.directions}  
        categories={categories}
        updateCategories={updateCategories}
        //PROPS BELOW ARE FUNCTIONS PASSED TO "RecipeDetails" COMPONENT
        recipes={details}
        updateRecipes={updateDetails}
        update={updateRecipe} 
        removeRecipe={removeRecipe} 
        updateIngredients={checkIngredients}
        shoppingItems={shoppingItems}
        addItemsToShoppingList={updateShoppingList}        
        />
      ))}         
    </div>
  );
}

export default Recipe;















