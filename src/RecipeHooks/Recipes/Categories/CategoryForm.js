import React from 'react';
import UseInput from "../Inputs/UseInput";

//FUNCTION TO EITHER LET USER ADD A NEW CATEGORY OR EDIT ONE THEY SELECTED
function CategoryForm({ctgyName, editMode, toggleEdit, toggleBack, updateCtgy, addNewCtgy, reset}) {   
    //FUNCTION TO UPDATE CATEGORY NAME TO WHAT USER INPUTS
    const [ctgy, setCtgy] = UseInput(editMode ? {category: ctgyName[0].category} : {category: ""})   
    //FUNCTION THAT TOGGLES USER BACK TO MENU BAR AND RESETS CATEGORY 
    const goBack = () => {    
        toggleBack(toggleEdit)    
        reset("-- Select Category --")    
    }
    
    return (
        <div className="CategoryForm-container">
            <button className="iconButton" onClick={() => goBack()}><i className="fas fa-arrow-left arrow"></i></button> 
            <form onSubmit={e => {
                e.preventDefault();
                //CHECKS IF USER LEFT INPUT BLANK
                if (ctgy.category.length <= 0) {
                    alert("Please enter a category name")
                } else {
                    //FUNCTION TO EITHER EDIT OR ADD A CATEGORY
                    editMode ? updateCtgy(ctgy, ctgyName[0].id) : addNewCtgy(ctgy);   
                    //FUNCTIONS TOGGLE BACK TO "CategoryMenu" COMPONENT           
                    toggleBack(toggleEdit)
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