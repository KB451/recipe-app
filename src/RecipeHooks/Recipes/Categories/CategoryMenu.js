import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import UseLocalStorage from "../Inputs/UseLocalStorage";
import CategoryForm from "./CategoryForm"

function CategoryMenu({selectCtgy, menuMode, toggleMenu}) {
    //VARIABLE ASSIGNED ARRAY WITH INITIAL VALUES OF RECIPE CATEGORIES THAT USER CAN CHOOSE FROM 
    const ctgyList = [
        {name: "Appetizers", id: uuidv4()},
        {name: "Soups & Salads", id: uuidv4()},
        {name: "Main Dishes: Meat", id: uuidv4()},
        {name: "Main Dishes: Vegetarian", id: uuidv4()},
        {name: "Sides", id: uuidv4()},
        {name: "Desserts", id: uuidv4()},
        {name: "Beverages", id: uuidv4()},
    ]
    const [categories, setCategories] = UseLocalStorage("categories", ctgyList)
    const displayCategories = (
        <div className="CategoryList-container">
            <select
            onChange={e => selectCtgy(e.target.value)}
            > 
                <option value="-- Select Category --">-- Select Category --</option>
                {categories.map(c => (                    
                    <option value={c.name}>{c.name}</option>                                
                ))}                          
            </select> 
        </div> 
    )  
    return (  
        <div>
            <div>
                {!menuMode && displayCategories}
            </div> 
                {menuMode && 
                    <div>
                        {displayCategories}
                        <button onClick={() => toggleMenu(true)}><i className="fas fa-newspaper"></i></button>                 
                        <button className="iconButton" ><i className="fas fa-plus add"/></button> 
                        <button className="iconButton" ><i className="fas fa-pencil-alt edit"/></button>  
                        <button className="iconButton"><i className="fas fa-trash-alt trash"/></button> 
                    </div>}

               





        </div>                      
    )
}

export default CategoryMenu;

 // {add && <CategoryForm
                //         toggle={toggleAdd}
                //         addNewCtgy={addCtgy}
                //         ctgyName={ctgyName}
                //         />}
                
                // {edit && 
                // <div>
                //     {displayCategories}
                //     <CategoryForm
                //     ctgyName={ctgyName}
                //     toggle={toggleEdit}
                //     updateCtgy={editCtgy}
                //     />
                // </div>
                // }