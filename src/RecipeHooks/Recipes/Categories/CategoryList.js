import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

function CategoryList() {
    const categories = [
        {name: "--Select Category--"},
        {name: "Pasta", id: uuidv4()},
        {name: "Seafood", id: uuidv4()},
        {name: "Appetizers", id: uuidv4()}
    ]
    const [ctgy, setCtgy] = useState(categories)

    return (
        // <div>
            <select>
                {ctgy.map(c => (                    
                    <option value={c.name}>{c.name}</option>                                
                ))}  
            </select> 
        // </div>                    
    )
}

export default CategoryList;