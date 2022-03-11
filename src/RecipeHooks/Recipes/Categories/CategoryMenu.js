import React, {useState} from 'react';
import CategoryList from './CategoryList';
import CategoryForm from "./CategoryForm"

function CategoryMenu({categories, updateCategories}) {
    return (
        <div>test</div>
        // <div>
        //     {menuMode && 
        //         <div>
        //             <CategoryList />
        //             <button><i className="fas fa-newspaper"></i></button>
        //             <button className="iconButton" ><i className="fas fa-plus add"/></button> 
        //             <button className="iconButton" ><i className="fas fa-pencil-alt edit"/></button>  
        //             <button className="iconButton"><i className="fas fa-trash-alt trash"/></button> 
        //         </div>}

        //     {add && <CategoryForm
        //             toggle={toggleAdd}
        //             addNewCtgy={addCtgy}
        //             ctgyName={ctgyName}
        //             />}
            
        //     {edit && 
        //     <div>
        //         <CategoryList />
        //         <CategoryForm
        //         ctgyName={ctgyName}
        //         toggle={toggleEdit}
        //         updateCtgy={editCtgy}
        //         />
        //     </div>
        //     }





        // </div>                      
    )
}

export default CategoryMenu