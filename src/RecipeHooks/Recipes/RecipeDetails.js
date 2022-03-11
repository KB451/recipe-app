import React from 'react';
import { Link } from "react-router-dom";
import EditRecipe from "./EditRecipe"
import UseToggle from "./Inputs/UseToggle"
import HaveIngredient from "./Ingredients/HaveIngredient"

/* PROPS ARE PASSED FROM "Recipe" COMPONENT. "RecipeDetails" FUNCTION DISPLAYS THE DETAILS OF 
A RECIPE OR THE FORM TO EDIT THE RECIPE. THE DETAILS INCLUDE THE RECIPE TITLE, INGREDIENTS, 
AND DIRECTIONS, PLUS BUTTONS TO EDIT OR DELETE THE RECIPE */
function RecipeDetails({ id, ctgy, title, ingredients, directions, update, removeRecipe, updateIngredients, shoppingItems, addItemsToShoppingList }) {  
 
  //FUNCTION TOGGLES BETWEEN RECIPE DETAILS AND FORM TO EDIT THE RECIPE
  const [isEdit, toggleEdit] = UseToggle()   
  
  //VARIABLE THAT EITHER DISPLAYS THE RECIPE DETAILS OR THE FORM TO EDIT THE RECIPE
  let displayRecipeDetails;
  if (isEdit) {
    //DISPLAYS FORM TO EDIT RECIPE
    displayRecipeDetails = (
        <div className="RecipeDetails-EditRecipe-container">
          <EditRecipe
          recipeId={id}
          name={title}
          ingredients={ingredients}
          instructions={directions}
          editMode={toggleEdit}
          saveUpdate={update}
          /> 
        </div>        
    )
  } else {
    //DISPLAYS DETAILS OF RECIPE
    displayRecipeDetails = (
      <div className="RecipeDetails-container">    
          <div className="RecipeDetails-iconLinks-container">      
              {/* LINK TAKES USER BACK TO "RecipeList" COMPONENT */}
              <Link className="iconLinks" to="/"><i className="fas fa-home iconButton home"/></Link>
              {/* BUTTON TOGGLES BETWEEN EDIT FORM AND RECIPE DETAILS WHEN USER CLICKS */}
              <button className="iconButton iconLinks" onClick={() => toggleEdit(isEdit)}><i className="fas fa-pencil-alt edit"/></button>  
              {/* LINK TAKES USER BACK TO "RecipeList" COMPONENT WHEN CLICKED AND ALSO CALLS "removeRecipe" AND DELETES RECIPE */}   
              <Link className="iconLinks" to="/" onClick={() => removeRecipe(id)}><i className="iconButton fas fa-trash-alt trash"/></Link> 
          </div>       
       
        <h2>{title}</h2> 
        <h4>Category: {ctgy}</h4>

        <div className="RecipeDetails-haveIngredient-container">            
          <HaveIngredient 
          recipeId={id} 
          recipeName={title}
          ingredients={ingredients}  
          //PASSES FUNCTION FROM "Recipe" COMPONENT TO "HaveIngredient" COMPONENT SO INGREDIENTS ARRAY IN "recipes" IS UPDATED   
          haveIngredients={updateIngredients}  
          //"Recipe" COMPONENT PASSES "items" FROM "ShoppingList" TO "HaveIngredient" SO "items" IS UPDATED WITH NEEDED INGREDIENTS
          shoppingItems={shoppingItems}
          //PASSES FUNCTION FROM "Recipe" COMPONENT TO "HaveIngredient" COMPONENT SO "ShoppingList" "items" IS UPDATED WITH NEEDED INGREDIENTS
          addItems={addItemsToShoppingList}     
          />
        </div>        
    
        <h3>Directions:</h3>   
         {/* CHECKS IF "directions" IS EMPTY */}  
         <div className="directions-container">
            <p id={directions.length > 0 ? "directions" : "no-directions-message"}>{directions.length > 0 ? directions : "no directions have been added"} </p>         
         </div>
      </div>
    )
  }  
  return displayRecipeDetails;
}

export default RecipeDetails;