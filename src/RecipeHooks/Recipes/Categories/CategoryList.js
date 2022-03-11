import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

function CategoryList({categories, selectCtgy}) {    
     
    return (
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
}

export default CategoryList;