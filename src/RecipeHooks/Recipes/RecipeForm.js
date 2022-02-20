import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid'
import CodeEditor from '@uiw/react-textarea-code-editor';
import UseInput from "./Inputs/UseInput"
import IngredientForm from "./Ingredients/IngredientForm"
import Ingredients from "./Ingredients/Ingredients"


/* "name" AND "add" ARE PROPS FROM THE "recipeList" COMPONENT - "name" PASSES IN RECIPE TITLE 
FROM SEARCH INPUT. "add" IS FUNCTION TO PASS USER DATA BACK TO "recipeList" AND UPDATE "recipes" 
DATA. THE "recipeForm" FUNCTION DISPLAYS INPUTS THAT TAKE IN USER DATA TO CREATE A NEW RECIPE THAT 
INCLUDES A TITLE, INGREDIENTS, AND DIRECTIONS. */
function RecipeForm({name, add, toggleHome}) {  
  //FUNCTION TO SET RECIPE DIRECTIONS WITH USER INPUT TAKEN FROM "CodeEditor"  
  const [directions, setDirections] = React.useState("");
  //USER INPUT THAT UPDATES RECIPE TITLE AND DIRECTIONS 
  const [recipe, setRecipe, reset] = UseInput({title: name, directions: ""})
  
  //FUNCTION THAT UPDATES INGREDIENTS ARRAY
  const [items, setNewItems] = useState([])  
  
  //FUNCTION ADDS ITEM TO INGREDIENTS ARRAY
  const addIngredients = (newItem) => {
    setNewItems([...items, {...newItem, id: uuidv4(), haveItem: false}])    
  } 
  //FUNCTION FILTERS OUT AN ITEM FROM INGREDIENTS ARRAY
  const removeIngredients = (id) => {
    setNewItems(items.filter(i => i.id !== id))
  }
  //FUNCTION UPDATES AN EDITED ITEM AND ADDS CHANGE TO INGREDIENTS ARRAY   
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
    <div className="App">    
        {/* INITAL VALUE SET TO USER INPUT FROM "recipeList" COMPONENT. USER CAN CHANGE OR ADD RECIPE TITLE */}
        <input type="text" placeholder="recipe name" name="title" value={recipe.title} onChange={setRecipe}></input>

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
            //CHECKS THAT USER TYPED SOMETHING IN THE RECIPE TITLE INPUT
            if (recipe.title.length > 0) {
              //FUNCTION PASSES USER DATA TO "recipeList" COMPONENT TO UPDATE "recipes" DATA
              add({title: recipe.title, ingredients: items, directions: directions})
            } else {
              //OTHERWISE AN ALERT TELLS USER A TITLE WAS NOT ENTERED
              alert("You have not entered a title for your recipe")
            }
            //CHECKS THAT USER HAS NOT TYPED ANYTHING BEFORE CLEARING INPUTS   
            if (recipe.directions.length <= 0) {
              //FUNCTION CLEARS USER DATA FROM INPUTS
              reset({title: "", directions: ""});
            }              
        }}> 
           <div>
            {/* TEXT EIDTOR COMPONENT */}
              <CodeEditor
                value={directions}
                language="js"
                placeholder="directions"
                onChange={(evn) => setDirections(evn.target.value)}
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />
            </div>
            <button className="iconButton"><i className="fas fa-save save"/></button>
        </form>        
        <button className="iconButton" onClick={() => toggleHome()}><i className="fas fa-home home"/></button>
    </div>
  );
}

export default RecipeForm;

// <textarea type="text" placeholder="directions" name="directions" value={recipe.directions} onChange={setRecipe}></textarea>
           