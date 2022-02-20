import React, { useState } from 'react';

//FUNCTION THAT HANDLES USER INPUT 
function UseInput(val) {
  //SETS INITIAL VALUE
  const [newVal, setNewVal] = useState(val)

  //CHANGES USER INPUT TO TITLE CASE  
  const toTitleCase = (str) => {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  //FUNCTION UPDATES VALUE PROVIDED BY USER  
  const handleChange = e => {
    let title;
    if (e.target.name === "title") {
      title = toTitleCase(e.target.value)
      setNewVal({...newVal, [e.target.name]: title}) 
    } else {
      setNewVal({...newVal, [e.target.name]: e.target.value})   
    }   
  }

  //FUNCTION CLEARS INPUT VALUE AFTER FORM SUBMITTED
  const handleSubmit = (obj) => {
    setNewVal(obj)
  }

  //RETURNS VALUE AND FUNCTIONS
  return [newVal, handleChange, handleSubmit]
}
export default UseInput;



