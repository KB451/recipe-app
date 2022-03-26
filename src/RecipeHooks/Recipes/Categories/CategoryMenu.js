import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UseToggle from "../Inputs/UseToggle";
import CategoryForm from "./CategoryForm";

//FUNCTION ALLOWS USER TO ADD, DELETE, OR EDIT A RECIPE CATEGORY
function CategoryMenu({categories, updateCategories, ctgyName, selectCtgy, menuMode, toggleMenu, recipes, updateRecipes}) {
    //alphabatizes category names in dropdown
    // let sortAlpha = (ctgyList) => {ctgyList.sort((a,b) => {
    //     const value1 = a.category.toLowerCase()
    //     const value2 = b.category.toLowerCase()
    //     if (value1 < value2) {
    //         return -1
    //     } 
    //     if (value1 > value2) {
    //         return 1
    //     }
    //     return 0
    //     }) 

    //     setCategories(ctgyList)
    // }      
    
    //FUNCTIONS TOGGLE TO DETERMINE WHAT WILL DISPLAY TO USER
    const [hideMenuBar, toggleHideMenuBar] = UseToggle();
    const [isAdd, toggleIsAdd] = UseToggle();
    const [isEdit, toggleIsEdit] = UseToggle();

    //FUNCTION TOGGLES BETWEEN MENU BAR AND "CategoryForm" COMPONENT
    const hideMenu = (toggleMenuBar) => {
        toggleHideMenuBar();
        toggleMenuBar()
    }
    //FUNCTION ALERTS USER IF THEY HAVE NOT SELECTED A CATEGORY WHEN EDIT BUTTON IS CLICKED
    const alertToSelectCtgy = () => {
        if (ctgyName === "-- Select Category --") {
            alert("Select a category to edit")
        } else {
            hideMenu(toggleIsEdit)
        }
    }
    //FUNCTION RESETS CATEGORY TO DISPLAY LIST OF RECIPES WHEN GOING BACK TO "RecipeList" COMPONENT
    const resetCtgyName = () => {         
        // selectCtgy(ctgyName[0].category)                  
        toggleMenu(true)
    }
    //FUNCTION RETURNS CATEGORY NAME SELECTED BASED OFF ITS ID
    const handleChange = (e) => {   
        const id = e.target.children[e.target.selectedIndex].id;     
        const ctgy = categories.filter(c => {
            if (c.id === id) {
                return e.target.value
            } 
        })   
        selectCtgy(ctgy)          
    }    
    //FUNCTION ADDS NEW CATEGORY USER INPUTS THROUGH "CategoryForm" COMPONENT
    const addCtgy = (newCtgy) => {
        updateCategories([...categories, {category: newCtgy.category, id: uuidv4()}])       
    } 
    //FUNCTION EDITS CATEGORY SELECTED BY USER THROUGH "CategoryForm" COMPONENT
    const editCtgy = (update, id) => {
        //VARIABLE UPDATES EDITED CATEGORY IN DROPDOWN MENU
        const updatedCtgy = categories.map(c => {
            if (c.id === ctgyName[0].id) {
                return {...c, category: update.category}
            }
            return c
        })
        updateCategories(updatedCtgy)
        //VARIABLE UPDATES ANY RECIPES THAT MATCH "ctgyId" WITH EDITED VERSION OF CATEGORY
        const updateRecipeCtgy = recipes.map(r => {
            if (r.ctgyId === id) {
                return {...r, category: update.category}
            }
            return r
        })
        updateRecipes(updateRecipeCtgy)
    }
    //FUNCTION REMOVES CATEGORY FROM DROPDOWN LIST
    const removeCtgy = () => {
        updateCategories(categories.filter(c => c.id !== ctgyName[0].id))
    }
   
    //VARIABLE DISPLAYS THE LIST OF CATEGORIES THROUGH A DROPDOWN ELEMENT
    const slctCtgyOpt = categories.filter(c => c.category === "-- Select Category --")
    const ctgyOptions = categories.filter(c => c.category !== "-- Select Category --")
    const displayCategories = (
        <div className="CategoryList-container">
            <select
            value={ctgyName[0].category}
            //FUNCTION CALLS "getCtgy" AND PASSES "id" TO RETURN THE CATEGORY NAME SELECTED BY USER
            onChange={handleChange}
            > 
                <option id={slctCtgyOpt[0].id} value={slctCtgyOpt[0].category}>{slctCtgyOpt[0].category}</option>                           
                {ctgyOptions.map(c => (                                       
                    <option key={c.id} id={c.id} value={c.category}>{c.category}</option>                                
                ))}                          
            </select> 
        </div> 
    )  
    
    return (  
        <div className="CategoryMenu-container">
            {/* DISPLAYS JUST THE DROPDOWN ELEMENT THAT LISTS THE RECIPE CATEGORIES */}           
            {!menuMode && displayCategories}            

            {/* DISPLAYS THE DROPDOWN ELEMENT AND MENU BAR THAT ALLOWS USER TO ADD, EDIT, OR DELETE A CATEGORY */}
            {menuMode && !hideMenuBar &&
                <div className="CategoryMenuBar-container">
                    <div className="menuBar-icon-container">
                        <button className="iconButton" onClick={() => resetCtgyName()}><i className="fas fa-arrow-left arrow"></i></button>                 
                        <button className="iconButton" onClick={() => hideMenu(toggleIsAdd)}><i className="fas fa-plus add"/></button> 
                        <button className="iconButton" onClick={() => alertToSelectCtgy()}><i className="fas fa-pencil-alt edit"/></button>  
                        <button className="iconButton" onClick={() => removeCtgy()}><i className="fas fa-trash-alt trash"/></button>  
                        <p className="ctgy-instructions">create your own category (+) or select a category below to edit or delete</p>                   
                    </div>                    
                    {displayCategories}
                </div>}

            {/* DISPLAYS ONLY THE "CategoryForm" COMPONENT SO USER CAN ADD A NEW CATEGORY */}
            {isAdd && hideMenuBar && <CategoryForm
                    toggle={toggleIsAdd}
                    toggleMenuBar={toggleHideMenuBar}
                    editMode={isEdit}
                    addNewCtgy={addCtgy}
                    ctgyName={ctgyName}
                    />}

            {/* DISPLAYS ONLY THE "CategoryForm" COMPONENT SO THAT USER CAN EDIT A SELECTED CATEGORY */}    
            {isEdit && hideMenuBar &&
                <div>                        
                    <CategoryForm
                    ctgyName={ctgyName}
                    editMode={isEdit}
                    toggle={toggleIsEdit}
                    toggleMenuBar={toggleHideMenuBar}
                    updateCtgy={editCtgy}
                    reset={selectCtgy}
                    />
                </div>
            }
        </div>                      
    )
}

export default CategoryMenu;

