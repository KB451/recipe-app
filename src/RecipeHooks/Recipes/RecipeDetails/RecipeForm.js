import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid'
import CodeEditor from '@uiw/react-textarea-code-editor';
import UseInput from "../Inputs/UseInput"
import UseToggle from "../Inputs/UseToggle";
import IngredientForm from "../Ingredients/IngredientForm"
import Ingredients from "../Ingredients/Ingredients"
import CategoryMenu from '../Categories/CategoryMenu';


/* "name" AND "add" ARE PROPS FROM THE "recipeList" COMPONENT - "name" PASSES IN RECIPE TITLE 
FROM SEARCH INPUT. "add" IS FUNCTION TO PASS USER DATA BACK TO "recipeList" AND UPDATE "recipes" 
DATA. THE "recipeForm" FUNCTION DISPLAYS INPUTS THAT TAKE IN USER DATA TO CREATE A NEW RECIPE THAT 
INCLUDES A TITLE, INGREDIENTS, AND DIRECTIONS. */
function RecipeForm({categories, updateCategories, ctgyName, selectCtgy, name, add, toggleHome}) {  
  //FUNCTION UPDATES RECIPE CATEGORY WHEN USER SELECTS A CATEGORY NAME
  const [ctgy, setCtgy] = useState(ctgyName)
  //FUNCTION TOGGLES BETWEEN "CategoryMenu" COMPONENT AND "RecipeForm" COMPONENT
  const [ctgyMenu, toggleCtgyMenu] = UseToggle()
  //USER INPUT THAT UPDATES RECIPE TITLE AND DIRECTIONS 
  const [recipe, setRecipe, reset] = UseInput({title: name, directions: ""})
  //FUNCTION TO SET RECIPE DIRECTIONS WITH USER INPUT TAKEN FROM "CodeEditor"  
  const [directions, setDirections] = React.useState("");
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
      <div>
        {/* DISPLAYS ONLY THE "CategoryMenu" COMPONENT */}
        {ctgyMenu && <CategoryMenu 
          categories={categories}
          updateCategories={updateCategories}
          menuMode={ctgyMenu}
          toggleMenu={toggleCtgyMenu}
          ctgyName={ctgy}
          //PASSES FUNCTION THAT WILL UPDATE CATEGORY NAME TO WHATEVER USER SELECTS
          selectCtgy={setCtgy}
          />
        } 

        {/* DISPLAYS FORM FOR USER TO CREATE A RECIPE */}
        {!ctgyMenu &&  <div className="App RecipeForm-container">     
          <div className="homeLink-container">
              {/* BUTTON CALLS "toggleHome" FUNCTION TO GO BACK TO DISPLAYING LIST OF RECIPE TITLES */}
              <button className="iconButton" onClick={() => toggleHome()}><i className="fas fa-home home"/></button>
          </div>

        {/* COMPONENT LETS USER SELECT A CATEGORY FOR RECIPE */}
        <div className="category-container">
          <CategoryMenu 
          categories={categories}
          updateCategories={updateCategories}
          menuMode={ctgyMenu}
          toggleMenu={toggleCtgyMenu}
          ctgyName={ctgy}
          //PASSES FUNCTION THAT WILL UPDATE CATEGORY NAME TO WHATEVER USER SELECTS
          selectCtgy={setCtgy}
          />
          <button className="iconButton-ctgy" onClick={() => toggleCtgyMenu()}><i className="fas fa-ellipsis-h ctgy-icon"></i></button>      
        </div>              

        {/* INITAL VALUE SET TO USER INPUT FROM "recipeList" COMPONENT. USER CAN CHANGE OR ADD RECIPE TITLE */}
        <input type="text" placeholder="recipe name" name="title" value={recipe.title} onChange={setRecipe}></input>

        <h3>Ingredients:</h3>
        <div className="ingredientForm-container">
            <IngredientForm 
            // PASSES FUNCTION "addIngredients" TO INGREDIENTS FORM SO USER INPUT CAN BE ADDED TO INGREDIENTS ARRAY ("items")
            addToRecipe={addIngredients}
            />
        </div>  

        <div className="ingredients-container">
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
        </div>                 

        <form onSubmit={e => {
        e.preventDefault();
        //CHECKS THAT USER TYPED SOMETHING IN THE RECIPE TITLE INPUT
        if (recipe.title.length > 0) {
          //FUNCTION PASSES USER DATA TO "recipeList" COMPONENT TO UPDATE "recipes" DATA
          add({category: ctgy[0].category, ctgyId: ctgy[0].id, title: recipe.title, ingredients: items, directions: directions})
        } else {
          //OTHERWISE AN ALERT TELLS USER A TITLE WAS NOT ENTERED
          alert("You have not entered a title for your recipe")
        }
        //CHECKS THAT USER HAS NOT TYPED ANYTHING BEFORE CLEARING INPUTS   
        if (recipe.directions.length <= 0) {
          //FUNCTION CLEARS USER DATA FROM INPUTS
          reset({title: "", directions: ""});
        }        
        selectCtgy("-- Select Category --")      
        }}> 
            <h3 id="directions-header">Directions:</h3>
            <div className="textEditor">
            {/* TEXT EIDTOR COMPONENT - REPLACES TEXTAREA ELEMENT. ALLOWS USER TO TYPE IN RECIPE DIRECTIONS */}
            <CodeEditor
            value={directions}
            language="js"
            placeholder="directions"
            onChange={(evn) => setDirections(evn.target.value)}
            padding={15}
            style={{
              fontSize: 14,
              color: "#2c201e",
              borderRadius: 10,
              backgroundColor: 'rgb(252, 248, 248)',
              fontFamily: 'Montserrat,sans-serif'
              }}
            />
            </div>
            <button className="regBtns">save</button>
        </form>
      </div>}
    </div>
  );
}

export default RecipeForm;


           