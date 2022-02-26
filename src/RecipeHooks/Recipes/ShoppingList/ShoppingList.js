import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import ShoppingListForm from "./ShoppingListForm"
import ShoppingItems from "./ShoppingItems"
import UseToggle from "../Inputs/UseToggle"
 
/* PROPS PASSED FROM "App.js" - "items" IS DATA FROM LOCAL STORAGE AND "setItems" UPDATES CHANGES TO THIS DATA.
"ShoppingList" FUNCTION DISPLAYS ITEMS ENTERED BY USER AND UPDATES "items" WHEN ANY CHANGES ARE MADE */
function ShoppingList({items, setItems, listOfRecipes, updateListOfRecipes}) { 
    //FUNCTION PASSED TO "ShoppingListForm" COMPONENT TO UPDATE STATE OF ITEM NAME AS USER TYPES  
    const [searchList, setSearchList] = useState("")  
    //FUNCTION TOGGLES BETWEEN DISPLAYING RECIPE TITLES AND ITEMS OR FULL SHOPPING LIST 
    const [isRecipeName, setIsRecipeName] = UseToggle()
      
    //FUNCTION ADDS NEW ITEMS TO "items"
    const addItems = (newItem) => {
        setItems([...items, {id: uuidv4(), acquiredItem: false, ...newItem}])        
    }
    //FUNCTION FILTERS ITEM OUT OF "items"
    const removeItems = id => {
        setItems(items.filter(i => i.id !== id))
    }
    //FUNCTION UPDATES ITEM AND ADDS EDITED ITEM TO "items"
    const editItems = (id, update) => {
        const updatedItem = items.map(i => {
            if (i.id === id) {
                return {...i, quantity: update.quantity, item: update.item}
            }
            return i
        })
        setItems(updatedItem)
    } 
    /* FUNCTION PASSED AS PROP TO "ShoppingItems" COMPONENT. RECIEVES CHANGED STATE TO UPDATE "items" WHEN
    USER CLICKS ON CHECKBOX INPUT. ALSO UPDATES INGREDIENTS ARRAY TO SHOW INGREDIENT HAS BEEN ACQUIRED */
    const checkItems = (shopItems, recipeId, ingredientId, index) => {
        setItems(shopItems)  
        //VARIABLE MAPS OVER LIST OF RECIPES TO MATCH WHICH RECIPE ITEM BELONGS TO
        const recipeUpdate = listOfRecipes.map(r => {
            if (r.id === recipeId) {
                //VARIABLE MAPS INGREDIENTS ARRAY OF RECIPE AND UPDATES STATE TO REFLECT WHEN USER CHECKS OFF ITEM FROM SHOPPING LIST 
                const haveIngredient = r.ingredients.map(i => {
                    if (i.id === ingredientId) {                                                   
                        return {...i, haveItem: shopItems[index].acquiredItem}                                                
                    }
                    return i                   
                })
                return {...r, ingredients: haveIngredient}
            } 
            return r       
        })
        //FUNCTION CALL TO UPDATE CHANGES IN RECIPE
        updateListOfRecipes(recipeUpdate)      
    }         
    //FUNCTION SETS "items" TO EMPTY ARRAY SO ALL ITEMS ARE REMOVED
    const removeAllItems = () => setItems([])

    //VARIABLE THAT WILL EITHER DISPLAY RECIPE TITLES AND ITEMS OR FULL SHOPPING LIST
    let displayShoppingList;
    //DISPLAYS RECIPE TITLES AND ITEMS
    if (isRecipeName) {
        displayShoppingList = (
            <div className="recipeTitles-container">
                <div className="backButton">
                   {/* BUTTON CALLS "setIsRecipeName" FUNCTION TO GO BACK TO DISPLAYING FULL SHOPPING LIST */}
                   <button className="iconButton" onClick={() => setIsRecipeName(true)}><i className="fas fa-arrow-left arrow"></i></button> 
                </div>
                             
                {items.length > 0 ? 
                <div>
                    {items.map(i => (
                        <div key={i.id}>                    
                            <ShoppingItems 
                            key={i.id}
                            id={i.id}
                            items={items}
                            recipeId={i.recId}                    
                            recipeName={i.recName}
                            quantity={i.quantity}
                            item={i.item}     
                            recipeNames={isRecipeName}
            
                            />
                        </div>              
                    ))}</div> :
                    <p>no items have been added</p>}                                
            </div>            
        )        
    } else {
        displayShoppingList = (
            <div className="App ShoppingList-container">
                <div className="ShoppingList-content">
                    <h1>Shopping List</h1>
                    {/* LINK TAKES USER BACK TO "RecipeList" COMPONENT WHEN CLICKED */}
                    <Link to="/"><i className="fas fa-home iconButton home"/></Link>

                    <ShoppingListForm 
                    //FUNCTIONS PASSED TO "ShoppingListForm" TO ADD NEW ITEMS TO SHOPPING LIST AND UPDATE STATE OF ITEMS NAME
                    search={setSearchList}
                    add={addItems}
                    />

                    {/* CALLS FUNCTION THAT REMOVES ALL ITEMS WHEN USER CLICKS */}
                    <button className="regBtns" onClick={removeAllItems}>delete all</button>
                
                    {/* HIDDEN UNLESS SCREEN IS MOBILE SIZE. WHEN CLICKED, BUTTON CALLS "setIsRecipeName" TO DISPLAY A LIST OF
                    RECIPE TITLES AND ITEMS */}
                    <div className="mobileListBtn-container">
                        <button className="iconButton" onClick={() => setIsRecipeName()}>Recipe Name</button>
                    </div>     

                    {items.length > 0 ? 
                    <div>{/* FILTERS "items" AS USER TYPES TO CHECK IF ITEM NAME MATCHES ANY ALREADY IN LIST */}
                    {items.filter(i => i.item.toLowerCase().includes(searchList.toLowerCase())).map((i, index) => (
                        <div key={i.id}>                    
                            <ShoppingItems 
                            key={i.id}
                            id={i.id}
                            index={index}
                            items={items}
                            checkItems={checkItems}
                            haveItem={i.acquiredItem}
                            recipeId={i.recId}                    
                            recipeName={i.recName}
                            quantity={i.quantity}
                            item={i.item}
                            remove={removeItems}
                            edit={editItems}
                            recipeNames={isRecipeName}
                            />
                        </div>              
                    ))}</div> :
                    <p>no items have been added</p>}            
                </div>            
        </div>    
        )
    }    
    return displayShoppingList
}

export default ShoppingList;