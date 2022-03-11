import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import TitleInput from "./Inputs/TitleInput"
import UseToggle from "./Inputs/UseToggle"
import RecipeForm from "./RecipeForm"
import CategoryList from "./Categories/CategoryList"

/* "recipes" AND "setRecipes" ARE PROPS FROM "App.js" - "recipes" IS DATA FROM LOCAL STORAGE, 
"setRecipes" IS FUNCTION TO UPDATE RECIPES WITH CHANGES. THE "RecipeList" COMPONENT IS A FUNCTION
THAT DISPLAYS EITHER A LIST OF RECIPES OR A FORM TO ADD NEW ONES */
function RecipeList({recipes, setRecipes, categories, updateCategories}) {  
    //INPUT UPDATES AS USER SEARCHES OR ADDS A NEW TITLE TO RECIPE   
    const [title, setTitle, reset] = TitleInput("")
    //FUNCTION UPDATES RECIPE CATEGORY WHEN USER SELECTS A CATEGORY NAME
    const [ctgy, setCtgy] = useState("-- Select Category --")
    //FUNCTION TOGGLES BETWEEN FORM TO CREATE NEW RECIPE AND THE LIST OF RECIPES ALREADY CREATED
    const [isForm, toggleForm] = UseToggle()   

    /* FUNCTION CALLS "setRecipes" TO ADD NEW RECIPE TO "recipes" DATA. ALSO CLEARS USER INPUTS, AND TOGGLES 
    USER OUT OF FORM AND BACK TO LIST OF RECIPES */
    const addRecipe = (newRecipe) => {
        setRecipes([...recipes, {id: uuidv4(), ...newRecipe}])
        reset({title: "", ingredients: [], directions: ""});
        toggleForm(true)
    }    
  
    //FUNCTION FILTERS OUT RECIPE FROM "recipes" 
    const removeRecipe = id => setRecipes(recipes.filter(r => r.id !== id))  

    //VARIABLE WILL EITHER DISPLAY FORM TO CREATE NEW RECIPE OR LIST OF RECIPES   
    let displayRecipeList;
    if (isForm) {
        //DISPLAYS "RecipeForm" COMPONENT
        displayRecipeList = (            
            <RecipeForm
            name={title}
            ctgyName={ctgy}
            selectCtgy={setCtgy} 
            // PASSES FUNCTION "addRecipe" TO FORM SO USER INPUT CAN BE ADDED TO "recipes" DATA
            add={addRecipe}
            toggleHome={toggleForm}
            />
        )
    } else {
        //DISPLAYS THE INPUT TO SEARCH OR ADD RECIPES, PLUS A LIST OF THE RECIPE TITLES
        displayRecipeList = (        
            <div className="App RecipeList-container">     
                <div className="RecipeList-content">
                    <h1>Favorite Recipes</h1>
                    {/* LINK TAKES USER TO "shoppingList" COMPONENT WHEN CLICKED */}
                    <Link className="link shoppingLink" to="/shopping-list">shopping list</Link>                
                    <div className="searchItems">                    
                        {/* USER INPUT TO SEARCH OR ADD A RECIPE TITLE */}
                        <input type="text" placeholder="search or add recipe" name="title" value={title} onChange={setTitle}></input>
                        {/* BUTTON TOGGLES BETWEEN DISPLAYING FORM AND USER INPUT / LIST OF RECIPE TITLES */}
                        <button className="iconButton" onClick={() => toggleForm(isForm)}><i className="fas fa-plus add"/></button>                    
                    </div>

                    {/* LETS USER SELECT RECIPE CATEGORY */}
                    <div className="category-container">
                        <CategoryList
                        categories={categories}
                        ctgyName={ctgy}
                        selectCtgy={setCtgy} 
                        />
                        <Link className="link" to="/category-menu"><button className="iconButton-ctgy"><i className="fas fa-ellipsis-h ctgy-icon"></i></button> </Link>                                            
                    </div>
                    
                    {/* IF "recipes" ARRAY HAS NOTHING IN IT, MESSAGE DISPLAYS */}
                    {recipes.length <= 0 ? <p>no recipes have been added</p> : ""}  
                    
                    <div className="recipeTitle-container">                   
                        {/* FILTERS "recipes" SO THAT AS USER TYPES, A TITLE DISPLAYS IF THERE IS A MATCH */}
                        {(ctgy === "-- Select Category --") && recipes.filter(r => r.title.toLowerCase().includes(title.toLowerCase())).map(r => (
                            <div className="recipeTitle-content" key={r.id}>
                                {/* RECIPE TITLE IS TURNED INTO A LINK THAT USER CLICKS TO SEE RECIPE DETAILS */}
                                <Link className="link titleLink xs" to={`/recipe/${r.id}`}>
                                    <h3>{r.title}</h3>                        
                                </Link> 
                                {/* CALLS FUNCTION TO DELETE A RECIPE WHEN CLICKED */}
                                <button className="iconButton" onClick={() => removeRecipe(r.id)}><i className="fas fa-trash-alt trash"/></button>
                            </div>                                                                         
                        ))}  
                        
                        {/* FILTERS "recipes" BY CATEGORY AND TITLE */}
                        {(ctgy !==  "-- Select Category --") && recipes.filter(r => r.category === ctgy && r.title.toLowerCase().includes(title.toLowerCase())).map(r => (
                        <div className="recipeTitle-content" key={r.id}>
                            {/* RECIPE TITLE IS TURNED INTO A LINK THAT USER CLICKS TO SEE RECIPE DETAILS */}
                            <Link className="link titleLink xs" to={`/recipe/${r.id}`}>
                                <h3>{r.title}</h3>                        
                            </Link> 
                            {/* CALLS FUNCTION TO DELETE A RECIPE WHEN CLICKED */}
                            <button className="iconButton" onClick={() => removeRecipe(r.id)}><i className="fas fa-trash-alt trash"/></button>
                        </div>                                                                         
                        ))} 
                    </div>                     
                </div>  
            </div>
        )
    }
  return displayRecipeList;
}

export default RecipeList;


