import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

/* PROPS PASSED FROM "RecipeDetails" COMPONENT. "HaveIngredient" FUNCTION DISPLAYS INGREDIENTS WITH A USER INPUT
(CHECKBOX) TO MARK INGREDIENTS THEY HAVE. IT ALSO UPDATES STATE OF THIS INPUT AND DISPLAYS A MESSAGE WITH HOW MANY
INGREDIENTS ARE NEEDED TO MAKE THE RECIPE AND PROVIDES A LINK TO ADD THOSE INGREDIENTS TO THE SHOPPING LIST. */
function HaveIngredient({ recipeId, recipeName, ingredients, haveIngredients, shoppingItems, addItems }) {   
  //FUNCTION UPDATES "isChecked" WHEN USER MARKS CHECKBOX INPUT (CHECKED MEANS USER HAS INGREDIENT, NOT CHECKED MEANS THEY NEED IT)
  const [isChecked, setIsChecked] = useState(ingredients)      
  // FUNCTION UPDATES "message" THAT WILL DISPLAY IF INGREDIENTS ARE NEEDED OR NOT
  const [length, setLength] = useState("")   
 
  //FUNCTION UPDATES WHEN USER CHECKS OFF AN INGREDIENT AND TRIGGERS A MESSAGE TO DISPLAY
  const handleHaveItems = (position, index) => {
    //FUNCTION UPDATES USER CHECKING OR UNCHECKING AN INGREDIENT
    const updatedIsChecked = isChecked.map(i => {
      if (i.id === position) {       
        return {...i, haveItem: !i.haveItem}
      }
      return i
    })  
    //FUNCTION CALL TO UPDATE "isChecked"   
    setIsChecked(updatedIsChecked) 
    //FUNCTION CALL TO TRIGGER NUMBER OF INGREDIENTS MESSAGE
    handleLength()
    //CALL TO PROP FUNCTION "haveIngredients" TO UPDATE THE INGREDIENTS ARRAY
    haveIngredients(recipeId, updatedIsChecked, position, index)     
  }   
  //FUNCTION TO DISPLAY MESSAGE BASED OFF HOW MANY INGREDIENTS USER HAS CHECKED OFF CHECKBOX INPUT
  const handleLength = () => {    
    //VARIABLE KEEPS TRACK OF HOW MANY INGREDIENTS ARE NEEDED TO MAKE RECIPE
    let lgth = ingredients.length     
    for (let i of ingredients) {
      //FOR EVERY INGREDIENT MARKED AS TRUE, SUBTRACT 1 FROM "ingredients" ARRAY LENGTH
      if (i.haveItem === true) {      
        lgth -= 1
      } 
    }
    setLength(lgth)
  } 

  //FUNCTION ADDS INGREDIENTS MARKED AS FALSE TO "ShoppingList" COMPONENT
  const addToShoppingList = () => {  
    //CREATES ARRAY WITH NO DUPLICATE ITEM IDS   
    let currentIngredients = new Set(shoppingItems.map(i => i.id)) 
    //ARRAY WITH ITEMS FROM "ShoppingList" COMPONENT
    let neededIngredients = [...shoppingItems]     
    
    for (let i of isChecked) {
      /* IF CHECKBOX IS NOT CHECKED AND THERE IS NO DUPLICATE ID IN "currentIngredients", THEN INGREDIENT IS PUSHED INTO 
      "neededIngredients" ARRAY */
      if ((i.haveItem === false) && !currentIngredients.has(i.id)) {
        neededIngredients.push({recId: recipeId, id: i.id, recName: recipeName, quantity: i.quantity, item: i.item, acquiredItem: i.haveItem})
      }
    }  
    addItems(neededIngredients)
  }
  
  //FUNCTION CALLS "handleMessage" FUNCTION WHENEVER THERE IS A CHANGE IN "ingredients" STATE
  useEffect(() => {
    handleLength()
  }, [ingredients])
 
  return (
    <div className="HaveIngredient-container"> 
      {/* CHECKS IF "ingredients" ARRAY IS EMPTY */}
      <div className="HaveIngredient-message-container">
        <h3>Ingredients:</h3>
        {ingredients.length <= 0 ?
        <p id="no-ingredients-message">no ingredients have been added</p> :
        <div>{length <= 0 ? <p>You have every ingredient to make this recipe</p> : <p>Number of ingredients to buy: <span className="numIng">{length}</span></p>}</div>}  
        <Link className="link" to="/shopping-list" onClick={() => addToShoppingList()}>view shopping list</Link> 
      </div>
           
      {isChecked.map((i, index) => (
        <div className="HaveIngredient-checkbox-container" key={i.id}>
          {/* TRACKS EACH USER INPUT (CHECKBOXES) WHEN CHECKED TRUE OR FALSE */}
            <label>
              <input type="checkbox" checked={isChecked[index].haveItem} onChange={() => handleHaveItems(isChecked[index].id, index)}></input>
              <span></span> 
            </label>
            <span>{i.quantity}</span>
            <span>{i.item}</span>        
        </div>
      ))}      
    </div>
  )
}  
export default HaveIngredient;
