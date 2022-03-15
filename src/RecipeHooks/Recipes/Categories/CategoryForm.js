import React, {useState} from 'react';
import UseInput from "../Inputs/UseInput";

//FUNCTION TO EITHER LET USER ADD A NEW CATEGORY OR EDIT ONE THEY SELECTED
function CategoryForm({ctgyName, editMode, toggle, toggleMenuBar, updateCtgy, addNewCtgy}) {   
    //FUNCTION TO UPDATE CATEGORY NAME TO WHAT USER INPUTS
    const [ctgy, setCtgy, reset] = UseInput(editMode ? {category: ctgyName[0].category} : {category: ""})   
    
    const goBack = () => {
        toggle(true);
        toggleMenuBar(true)
    }
    return (
        <div className="CategoryForm-container">
            <button className="iconButton" onClick={() => goBack()}><i className="fas fa-arrow-left arrow"></i></button> 
            <form onSubmit={e => {
                e.preventDefault();
                if (ctgy.category.length <= 0) {
                    alert("Please enter a category name")
                } else {
                    //FUNCTION TO EITHER EDIT OR ADD A CATEGORY
                    editMode ? updateCtgy(ctgy) : addNewCtgy(ctgy);   
                    reset({category: ""}) 
                    //FUNCTIONS TOGGLE BACK TO "CategoryMenu" COMPONENT           
                    toggle(true);
                    toggleMenuBar(true)
                }               
            }}           
            >
                <input type="text" placeholder="add category" name="category" value={ctgy.category} onChange={setCtgy}></input>
                <button className="regBtns">save</button>
            </form>
        </div>
    )

}

export default CategoryForm;