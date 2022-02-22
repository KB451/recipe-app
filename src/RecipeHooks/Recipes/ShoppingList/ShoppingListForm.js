import React, {useEffect} from 'react';
import UseInput from "../Inputs/UseInput"

//PROPS PASSED FROM "ShoppingList" COMPONENT. FUNCTION "ShoppingListForm" DISPLAYS USER INPUTS TO ADD QUANTITY AND ITEM
function ShoppingListForm({search, add}) {
    //INPUT TAKES IN USER DATA FOR QUANTITY AND ITEM
    const [items, setItems, reset] = UseInput({quantity: "", item: ""})

    //PASSES USER DATA TO "ShoppingList" COMPONENT AS IT CHANGES SO A MATCHING ITEM CAN BE FILTERED AS USER TYPES
    // useEffect(() => {
    //     search(items.item)
    // }, [items.items])

    return (
        <div className="ShoppingListForm-container">
            <form onSubmit={e => {
                e.preventDefault()
                //FUNCTION FROM PROPS THAT PASSES IN USER DATA TO "ShoppingList" COMPONENT
                add(items)
                //FUNCTION CLEARS USER DATA FROM INPUTS
                reset({quantity: "", item: ""})
                document.getElementById("quantity").focus() 
            }}>
                <input type="text" placeholder="quantity" id="quantity" name="quantity" value={items.quantity} onChange={setItems}></input>
                <input type="text" placeholder="item" name="item" value={items.item} onChange={setItems}></input>
                <button className="iconButton"><i className="fas fa-plus add"/></button>
            </form>
        </div>
    )
}

export default ShoppingListForm;