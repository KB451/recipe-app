import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid'
import CodeEditor from '@uiw/react-textarea-code-editor';
import UseInput from "./Inputs/UseInput"
import IngredientForm from "./Ingredients/IngredientForm"
import Ingredients from "./Ingredients/Ingredients"

//PROPS PASSED FROM "RecipeDetails" COMPONENT. "EditRecipe" FUNCTION DISPLAYS INPUTS SO USER CAN EDIT RECIPE
function EditRecipe({recipeId, name, ingredients, instructions, saveUpdate, editMode}) {    
  //FUNCTION TO SET RECIPE DIRECTIONS WITH USER INPUT TAKEN FROM "CodeEditor"  
  const [updatedDirections, setUpdatedDirections] = React.useState(instructions);
  //USER INPUT TO CHANGE RECIPE TITLE AND DIRECTIONS
  const [recipe, setRecipe] = UseInput({title: name, directions: instructions})
  //FUNCTION UPDATES STATE OF INGREDIENTS ARRAY
  const [items, setNewItems] = useState(ingredients)  
  
  //FUNCTION ADDS NEW ITEM TO INGREDIENTS ARRAY
  const addIngredients = (newItem) => {
    setNewItems([...items, {...newItem, id: uuidv4(), haveItem: false}])      
  }  
  //FUNCTION FILTERS ITEM OUT OF INGREDIENTS ARRAY
  const removeIngredients = (id) => {
    setNewItems(items.filter(i => i.id !== id))
  }  
  //FUNCTION UPDATES ITEM AND ADDS EDITED ITEM TO INGREDIENTS ARRAY 
  const editIngredients = (id, update) => {
    const updatedItem = items.map(i => {
      if (i.id === id) {
        return {...i, quantity: update.quantity, item: update.item}
      }
      return i
    })
    setNewItems(updatedItem)
  }   
  return (
    <div className="App EditRecipe-container"> 
        {/* INITAL VALUE IS FROM "Recipe" COMPONENT. USER INPUT CHANGES RECIPE TITLE */}   
        <input type="text" placeholder="recipe name" name="title" value={recipe.title} onChange={setRecipe}></input>
        
        <h3>Ingredients:</h3>
        <IngredientForm 
        // PASSES FUNCTION "addIngredients" TO INGREDIENTS FORM SO USER INPUT CAN BE ADDED TO INGREDIENTS ARRAY ("items")
        addToRecipe={addIngredients}
        />
        {/* DISPLAYS INGREDIENTS AND PASSES FUNCTIONS "removeIngredients" AND "editIngredients" TO "Ingredients" COMPONENT
        SO USER INPUT CAN UPDATE INGREDIENTS ARRAY ("items") */}
        {items.map(i => (
            <Ingredients
            key={i.id}
            id={i.id}
            quantity={i.quantity}
            item={i.item}
            remove={removeIngredients}
            edit={editIngredients}
            />
        ))}

        <form onSubmit={e => {
            e.preventDefault();
            //FUNCTION PASSED AS A PROP FROM "RecipeDetails" THAT UPDATES "recipes" DATA WITH USER CHANGES
            saveUpdate(recipeId, {title: recipe.title, ingredients: items, directions: updatedDirections})
            //TOGGLES OUT OF EDIT FORM BACK TO "RecipeDetails"
            editMode(true)
        }}>   
            {/* THE INITAL VALUE IS FROM "Recipe" COMPONENT. TEXT EDITOR COMPONENT UPDATES USER DIRECTIONS */}             
            <div className="textEditor">
              <CodeEditor
                value={updatedDirections}
                language="js"
                placeholder="directions"
                onChange={(evn) => setUpdatedDirections(evn.target.value)}
                padding={15}
                style={{
                  borderRadius: 10,
                  fontSize: 14,
                  backgroundColor: 'rgb(252, 248, 248)',
                  fontFamily: 'Montserrat,sans-serif',
                }}
              />
            </div>
            <button className="iconButton"><i className="fas fa-save save"/></button>
        </form>       
    </div>
  );
}

export default EditRecipe;