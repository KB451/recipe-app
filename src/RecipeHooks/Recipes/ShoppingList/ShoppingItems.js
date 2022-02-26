import React, {useState} from 'react';
import { Link } from "react-router-dom";
import UseToggle from "../Inputs/UseToggle"
import UseInput from "../Inputs/UseInput"

/* PROPS PASSED FROM "ShoppingList" COMPONENT. "ShoppingItems" FUNCTION DISPLAYS EITHER THE QUANTITY AND ITEM NAME OR THE FORM 
TO EDIT AN ITEM */
function ShoppingItems({id, index, items, checkItems, recipeId, recipeName, quantity, item, haveItem, remove, edit, recipeNames}) {
    //FUNCTION TOGGLES "isEdit" STATE AND TRIGGERS DISPLAYING EITHER ITEMS OR EDIT FORM
    const [isEdit, setIsEdit] = UseToggle()
    //USER INPUT THAT UPDATES QUANTITY AND ITEM
    const [update, setUpdate] = UseInput({quantity: quantity, item: item}) 
    //FUNCTION UPDATES STATE OF USER INPUT (CHECKBOX) - CHECKED IF HAVE ITEM, NOT CHECKED IF DO NOT HAVE ITEM
    const [isChecked, setIsChecked] = useState(items)  
    
    /* FUNCTION TOGGLES BOOLEAN STATE OF USER INPUT (CHECKBOX) AND CALLS PROP FUNCTION "checkItems" TO 
    PASS IN CHANGES AND UPDATE "items" */
    const haveItems = (position) => {
        const updateItem = items.map(i => {
            if (i.id === position) {
                return {...i, acquiredItem: !i.acquiredItem}
            }
            return i
        })
        setIsChecked(updateItem)        
        checkItems(updateItem, recipeId, id, index)
    }            
       
    //VARIABLE DISPLAYS EITHER: ITEMS; OR RECIPE TITLE & ITEM; OR FORM TO EDIT ITEM     
    let displayItem;
    if (isEdit) {
        //DISPLAYS EDIT FORM
        displayItem = (
            <div className="ShoppingItems-displayEditMode-container">
                <form onSubmit={e => {
                    e.preventDefault()
                    //FUNCTION PROP THAT PASSES IN THE CHANGES USER MADE TO QUANTITY AND ITEM
                    edit(id, update)
                    //FUNCTION TOGGLES BACK TO ITEMS
                    setIsEdit(true)
                }}>
                    {/* INITIAL VALUES ARE FROM "ShoppingList" AND UPDATES CHANGES MADE BY USER */}
                    <input type="text" placeholder="quantity" name="quantity" value={update.quantity} onChange={setUpdate}></input>
                    <input type="text" placeholder="item" name="item" value={update.item} onChange={setUpdate}></input>
                    <button className="iconButton"><i className="fas fa-save save"/></button>
                </form>
            </div>            
        )
    } else if (!isEdit && recipeNames) {
        //DISPLAYS RECIPE TITLE AND ITEM WHEN SCREEN IS MOBILE SIZE
        displayItem = (            
            <div className="displayTitleLinks-content"> 
                {/* EITHER DISPLAYS A LINK TO RECIPE OR JUST A DIV */}
                {recipeName !== undefined ?                
                <div className="recipeTitles"> 
                    {/* IF USER ADDS INGREDIENTS FROM A RECIPE, THIS LINK WILL TAKE USER BACK TO THAT RECIPE */}
                    <Link className="link" to={`/recipe/${recipeId}`}>{recipeName}</Link>
                </div> :
                <div className="recipeTitles noRecipeMessage">non-recipe item</div>
                }
                
                <div className="items"> 
                    <span>{quantity} {item}</span>
                </div>                           
            </div>                       
        )
    } else {
    //DISPLAYS ITEM
    displayItem = (
        <div className="ShoppingItems-displayItemsContainer"> 
            {/* EITHER DISPLAYS A LINK TO RECIPE OR JUST A DIV */}
            {recipeName !== undefined ?                
            <div className="recipeLink"> 
                {/* IF USER ADDS INGREDIENTS FROM A RECIPE, THIS LINK WILL TAKE USER BACK TO THAT RECIPE */}
                <Link className="link" to={`/recipe/${recipeId}`}>{recipeName}</Link>
            </div> :
            <div className="recipeLink titleMessage">non-recipe item</div>
            }
        
            {/* TRACKS EACH CHECKBOX INPUT WHEN USER CHECKS TRUE OR FALSE */}              
            <div className="checkItem">
                <label>
                    <input type="checkbox" checked={isChecked[index].acquiredItem} onChange={() => haveItems(isChecked[index].id)}></input>                      
                    <span></span>
                </label>
            </div>
            
            <div className="item"> 
                <span className={haveItem ? "crossOff" : "hideLine"}>{quantity} {item}</span>
            </div>            
        
            <div className="itemBtns">                
                {/* CALLS FUNCTION THAT TOGGLES TO DISPLAY THE EDIT FORM */}              
                <button className="iconButton" onClick={setIsEdit}><i className="fas fa-pencil-alt edit"/></button>
                {/* IF USER CLICKS BUTTON, PROP FUNCTION "remove" IS CALLED AND DELETED AN ITEM FROM LIST */}
                <button className="iconButton" onClick={() => remove(id)}><i className="fas fa-trash-alt trash"/></button>          
            </div>             
        </div>
    )
}    
    return displayItem;
}

export default ShoppingItems;