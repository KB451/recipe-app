import React from 'react';
import UseInput from "../Inputs/UseInput"
import UseToggle from "../Inputs/UseToggle"

//PROPS PASSED FROM BOTH "RecipeForm" and "EditRecipe" COMPONENTS. "Ingredients" FUNCTION EITHER DISPLAYS INGREDIENTS OR EDIT FORM
function Ingredients({id, quantity, item, remove, edit}) {
  //INPUT UPDATES USER CHANGES TO INGREDIENT QUANTITY AND ITEM 
  const [updatedItem, setUpdatedItem] = UseInput({quantity: quantity, item: item})
  //FUNCTION TOGGLES "isEdit" STATE TO EITHER DISPLAY INGREDIENTS OR FORM TO EDIT INGREDIENT
  const [isEdit, setIsEdit] = UseToggle()  
  
  //VARIABLE DISPLAYS EITHER INGREDIENTS OR FORM TO EDIT INGREDIENT
  let displayIngredients;
  if (isEdit) {
    //DISPLAYS FORM TO EDIT INGREDIENT
    displayIngredients = (
      <div className="Ingredients-displayEditModeContainer">
        <form onSubmit={(e) => {
          e.preventDefault();
          //CALL TO PROP FUNCTION "edit" AND PASSES EDITED INGREDIENT TO INGREDIENTS ARRAY
          edit(id, updatedItem)
          //CALLS FUNCTION TO TOGGLE STATE BACK TO DISPLAYING INGREDIENTS
          setIsEdit(true)
        }}>
            {/* INITIAL VALUES ARE SET TO USER INPUT FROM "RecipeDetails" COMPONENT. INPUTS UPDATE USER CHANGES  */}
            <input type="text" placeholder="quantity" name="quantity" value={updatedItem.quantity} onChange={setUpdatedItem}></input>
            <input type="text" placeholder="item" name="item" value={updatedItem.item} onChange={setUpdatedItem}></input>
            <button className="iconButton"><i className="fas fa-save save"/></button>
        </form>
    </div>
    )
  } else {
    //DISPLAYS INGREDIENTS
    displayIngredients = (
      <div className="Ingredients-displayContainer">       
        <span>{quantity} {item}</span>
        {/* CALLS FUNCTION TO TOGGLE STATE SO EDIT FORM DISPLAYS WHEN CLICKED  */}
        <button className="iconButton" onClick={() => setIsEdit()}><i className="fas fa-pencil-alt edit"/></button>             
        {/* CALLS PROP FUNCTION "remove" TO DELETE AN INGREDIENT WHEN CLICKED  */}
        <button className="iconButton" onClick={() => remove(id)}><i className="fas fa-trash-alt trash"/></button>  
      </div>
    )
  }
  return displayIngredients;
}

export default Ingredients;