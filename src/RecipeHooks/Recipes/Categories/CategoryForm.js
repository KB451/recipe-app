import React, {useState} from 'react';
import UseInput from "../Inputs/UseInput";

function CategoryForm({ctgyName, editMode, toggle, toggleMenuBar, updateCtgy, addNewCtgy}) {    
    const [ctgy, setCtgy, reset] = UseInput(editMode ? {category: ctgyName} : {category: ""})
   
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                editMode ? updateCtgy(ctgy) : addNewCtgy(ctgy);   
                reset({category: ""})            
                toggle(true);
                toggleMenuBar(true)
            }}           
            >
                <input type="text" placeholder="add category" name="category" value={ctgy.category} onChange={setCtgy}></input>
                <button>save</button>
            </form>
        </div>
    )

}

export default CategoryForm;