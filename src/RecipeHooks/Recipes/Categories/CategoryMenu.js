import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import UseLocalStorage from "../Inputs/UseLocalStorage";
import UseToggle from "../Inputs/UseToggle";
import CategoryForm from "./CategoryForm";

function CategoryMenu({ctgyName, selectCtgy, menuMode, toggleMenu}) {
    //VARIABLE ASSIGNED ARRAY WITH INITIAL VALUES OF RECIPE CATEGORIES THAT USER CAN CHOOSE FROM 
    const ctgyList = [
        {category: "Appetizers", id: uuidv4()},
        {category: "Soups & Salads", id: uuidv4()},
        {category: "Main Dishes: Meat", id: uuidv4()},
        {category: "Main Dishes: Vegetarian", id: uuidv4()},
        {category: "Sides", id: uuidv4()},
        {category: "Desserts", id: uuidv4()},
        {category: "Beverages", id: uuidv4()},
    ]
    const [categories, setCategories] = UseLocalStorage("categories", ctgyList)
    

    const [hideMenuBar, toggleHideMenuBar] = UseToggle();
    const [isAdd, toggleIsAdd] = UseToggle();
    const [isEdit, toggleIsEdit] = UseToggle();

    const hideMenu = (toggleMenuBar) => {
        toggleHideMenuBar();
        toggleMenuBar()
    }

    const addCtgy = (newCtgy) => {
        console.log(newCtgy)
        setCategories([...categories, {category: newCtgy.category, id: uuidv4()}])
        console.log(categories)
        console.log(newCtgy.category)
    }
    
    const displayCategories = (
        <div className="CategoryList-container">
            <select
            onChange={e => selectCtgy(e.target.value)}
            > 
                <option value="-- Select Category --">-- Select Category --</option>
                {categories.map(c => (                    
                    <option key={c.id} value={c.category}>{c.category}</option>                                
                ))}                          
            </select> 
        </div> 
    )  
    return (  
        <div>
            <div>
                {!menuMode && displayCategories}
            </div> 

                {menuMode && !hideMenuBar &&
                    <div>
                        {displayCategories}
                        <button onClick={() => toggleMenu(true)}><i className="fas fa-newspaper"></i></button>                 
                        <button className="iconButton" onClick={() => hideMenu(toggleIsAdd)}><i className="fas fa-plus add"/></button> 
                        <button className="iconButton" onClick={() => hideMenu(toggleIsEdit)}><i className="fas fa-pencil-alt edit"/></button>  
                        <button className="iconButton"><i className="fas fa-trash-alt trash"/></button> 
                    </div>}

                {isAdd && hideMenuBar && <CategoryForm
                        toggle={toggleIsAdd}
                        toggleMenuBar={toggleHideMenuBar}
                        editMode={isEdit}
                        addNewCtgy={addCtgy}
                        ctgyName={ctgyName}
                        />}
                
                {isEdit && hideMenuBar &&
                    <div>
                        {displayCategories}
                        <CategoryForm
                        ctgyName={ctgyName}
                        editMode={isEdit}
                        toggle={toggleIsEdit}
                        toggleMenuBar={toggleHideMenuBar}
                        // updateCtgy={editCtgy}
                        />
                    </div>
                }





        </div>                      
    )
}

export default CategoryMenu;

