import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid'
import CodeEditor from '@uiw/react-textarea-code-editor';
import UseInput from "../Inputs/UseInput"
import UseToggle from "../Inputs/UseToggle"
import IngredientForm from "../Ingredients/IngredientForm"
import Ingredients from "../Ingredients/Ingredients"
import CategoryMenu from '../Categories/CategoryMenu';

//PROPS PASSED FROM "RecipeDetails" COMPONENT. "EditRecipe" FUNCTION DISPLAYS INPUTS SO USER CAN EDIT RECIPE
function EditRecipe({recipeId, categories, updateCategories, ctgyName, name, ingredients, instructions, saveUpdate, editMode}) { 
  //FUNCTION UPDATES RECIPE CATEGORY WHEN USER SELECTS A CATEGORY NAME
  const [ctgy, setCtgy] = useState(ctgyName)
  //FUNCTION TOGGLES BETWEEN "CategoryMenu" COMPONENT AND "EditForm" COMPONENT
  const [ctgyMenu, toggleCtgyMenu] = UseToggle()   
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
  console.log(ctgy) 
  return (
    <div className="EditRecipe-container"> 
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
      
      {!ctgyMenu && <div>
        <div className="titleInput-container">
          {/* BUTTON CALLS "editMode" FUNCTION TO GO BACK TO DISPLAYING RECIPE DETAILS */}
          <button className="iconButton" onClick={()=> editMode(true)}><i className="fas fa-arrow-left arrow"></i></button>  

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
      
          {/* INITAL VALUE IS FROM "Recipe" COMPONENT. USER INPUT CHANGES RECIPE TITLE */}   
          <input type="text" placeholder="recipe name" name="title" value={recipe.title} onChange={setRecipe}></input>       
        </div>
        
        <h3 id="ingredients-title">Ingredients:</h3>
        <div className="ingredientForm-container">
          {/* DISPLAYS USER INPUTS TO ADD INGREDIENTS */}
          <IngredientForm 
          // PASSES FUNCTION "addIngredients" TO INGREDIENTS FORM SO USER INPUT CAN BE ADDED TO INGREDIENTS ARRAY ("items")
          addToRecipe={addIngredients}
          />
        </div>      
           
        <div className="ingredientsList-container">
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
        
        <h3>Directions:</h3>
        <form onSubmit={e => {
            e.preventDefault();
            //FUNCTION PASSED AS A PROP FROM "RecipeDetails" THAT UPDATES "recipes" DATA WITH USER CHANGES
            saveUpdate(recipeId, {category: ctgy[0].category, ctgyId: ctgy[0].id, title: recipe.title, ingredients: items, directions: updatedDirections})
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
                  fontSize: 18,
                  color: "#2c201e",
                  borderRadius: 10,
                  backgroundColor: 'rgb(252, 248, 248)',
                  fontFamily: 'Montserrat,sans-serif',
                }}
              />
            </div>
            <button className="regBtns">save</button>
        </form>
      </div>}         
    </div>
  );
}

export default EditRecipe;