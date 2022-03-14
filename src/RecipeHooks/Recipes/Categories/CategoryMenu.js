import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import UseLocalStorage from "../Inputs/UseLocalStorage";
import UseToggle from "../Inputs/UseToggle";
import CategoryForm from "./CategoryForm";

//FUNCTION ALLOWS USER TO ADD, DELETE, OR EDIT A RECIPE CATEGORY
function CategoryMenu({ctgyName, selectCtgy, menuMode, toggleMenu}) {
    //VARIABLE ASSIGNED ARRAY WITH INITIAL VALUES OF RECIPE CATEGORIES THAT USER CAN CHOOSE FROM 
    const ctgyList = [
        {category: "Appetizers", id: uuidv4()},
        {category: "Soups & Salads", id: uuidv4()},
        {category: "Soups & Salads", id: uuidv4()},
        {category: "Main Dishes: Meat", id: uuidv4()},
        {category: "Main Dishes: Vegetarian", id: uuidv4()},
        {category: "Sides", id: uuidv4()},
        {category: "Desserts", id: uuidv4()},
        {category: "Beverages", id: uuidv4()},
    ]
    //FUNCTION SAVES LIST OF CATEGORIES TO LOCAL STORAGE
    const [categories, setCategories] = UseLocalStorage("categories", ctgyList)
    
    //FUNCTIONS TOGGLE TO DETERMINE WHAT WILL DISPLAY TO USER
    const [hideMenuBar, toggleHideMenuBar] = UseToggle();
    const [isAdd, toggleIsAdd] = UseToggle();
    const [isEdit, toggleIsEdit] = UseToggle();

    //FUNCTION TOGGLES BETWEEN MENU BAR AND "CategoryForm" COMPONENT
    const hideMenu = (toggleMenuBar) => {
        toggleHideMenuBar();
        toggleMenuBar()
    }
    const resetCtgyName = () => {
        selectCtgy("-- Select Category --")
        toggleMenu(true)
    }
    //FUNCTION RETURNS CATEGORY NAME SELECTED BASED OFF ITS ID
    const getCtgy = (id) => {
        const ctgy = categories.filter(c => {
            if (c.id === id) {
                return c.category
            }
        })
        selectCtgy(ctgy)
    }
    //FUNCTION ADDS NEW CATEGORY USER INPUTS THROUGH "CategoryForm" COMPONENT
    const addCtgy = (newCtgy) => {
        setCategories([...categories, {category: newCtgy.category, id: uuidv4()}])       
    } 
    //FUNCTION EDITS CATEGORY SELECTED BY USER THROUGH "CategoryForm" COMPONENT
    const editCtgy = (update) => {
        const updatedCtgy = categories.map(c => {
            if (c.id === ctgyName[0].id) {
                return {...c, category: update.category}
            }
            return c
        })
        setCategories(updatedCtgy)
    }

   



    //VARIABLE DISPLAYS THE LIST OF CATEGORIES THROUGH A DROPDOWN ELEMENT
    const displayCategories = (
        <div className="CategoryList-container">
            <select
            //FUNCTION CALLS "getCtgy" AND PASSES "id" TO RETURN THE CATEGORY NAME SELECTED BY USER
            onChange={e => getCtgy(e.target.value)}
            > 
                <option value="-- Select Category --">-- Select Category --</option>
                {categories.map(c => (                    
                    <option key={c.id} id={c.id} value={c.id}>{c.category}</option>                                
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
                        <button className="iconButton" onClick={() => hideMenu(toggleIsEdit)}><i className="fas fa-pencil-alt edit"/></button>  
                        <button className="iconButton"><i className="fas fa-trash-alt trash"/></button>                     
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
                    />
                </div>
            }
        </div>                      
    )
}

export default CategoryMenu;

