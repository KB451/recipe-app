import React, {useState} from 'react';

function CategoryForm({ctgyName, editMode, toggle, updateCtgy, addNewCtgy}) {    
    const [ctgy, setCtgy] = useState(editMode ? ctgyName : "")
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                editMode ? updateCtgy(ctgy) : addNewCtgy(ctgy);                
                toggle(true);
            }}           
            >
                <input type="text" placeholder="add category" value={ctgy} onChange={setCtgy}></input>
                <button>save</button>
            </form>
        </div>
    )

}

export default CategoryForm;