import React from 'react';
import UseInput from "../Inputs/UseInput"

//PROP PASSED FROM BOTH "RecipeForm" and "EditRecipe" COMPONENTS. "IngredientForm" FUNCTION DISPLAYS USER INPUTS TO ADD INGREDIENTS. 
function IngredientForm({ addToRecipe }) {
    //INPUT UPDATES USERS DATA FOR QUANTITY AND ITEM 
    const [ingredient, setIngredient, reset] = UseInput({quantity: "", item: ""})
  return (
    <div className="App">
        <form onSubmit={e => {
            e.preventDefault();
            //CALL TO PROP FUNCTION "addToRecipe" THAT ADDS ITEM TO INGREDIENTS ARRAY
            addToRecipe(ingredient)            
            //FUNCTION CLEARS USER INPUTS
            reset({quantity: "", item: ""}) 
            //RESETS FOCUS BACK TO "quantity" INPUT 
            document.getElementById("quantity").focus()              
        }}>
            <input type="text" placeholder="quantity" id="quantity" name="quantity" value={ingredient.quantity} onChange={setIngredient}></input>
            <input type="text" placeholder="ingredient" name="item" value={ingredient.item} onChange={setIngredient}></input>
            <button className="iconButton"><i className="fas fa-plus add"/></button>
        </form>
    </div>
  );
}

export default IngredientForm;














