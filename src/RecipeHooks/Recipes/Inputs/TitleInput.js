import React, { useState, useEffect } from 'react';

//FUNCTION THAT HANDLES USER INPUT FOR RECIPE TITLE
function TitleInput(item) {
  //SETS INITIAL VALUE
  const [value, setValue] = useState(item)

  //CHANGES USER INPUT TO TITLE CASE  
  const toTitleCase = (str) => {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }
  
  //FUNCTION UPDATES VALUE PROVIDED BY USER   
  const handleChange = (e) => {
    let title = toTitleCase(e.target.value)
    setValue(title)
  }

  //FUNCTION CLEARS INPUT VALUE AFTER FORM IS SUBMITTED
  const handleSubmit = () => {
    setValue("")
  }  

  //RETURNS VALUE AND FUNCTIONS
  return [value, handleChange, handleSubmit]
}
export default TitleInput;


