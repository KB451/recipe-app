import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function CategoryList({selectCtgy}) {
    const categories = [
        {name: "Appetizers", id: uuidv4()},
        {name: "Soups & Salads", id: uuidv4()},
        {name: "Main Dishes: Meat", id: uuidv4()},
        {name: "Main Dishes: Vegetarian", id: uuidv4()},
        {name: "Sides", id: uuidv4()},
        {name: "Desserts", id: uuidv4()},
        {name: "Beverages", id: uuidv4()},
    ]
    return (
        // <div>
            <select
            onChange={e => selectCtgy(e.target.value)}
            >
                <option>--Select Category--</option>
                {categories.map(c => (                    
                    <option value={c.name}>{c.name}</option>                                
                ))}  
            </select> 
        // </div>                    
    )
}

export default CategoryList;