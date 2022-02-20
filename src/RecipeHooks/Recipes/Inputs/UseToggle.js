import React, { useState } from 'react';

//FUNCTION TOGGLES BOOLEAN WHEN BUTTON IS CLICKED
function UseToggle(startValue = false) {
  //SETS INITIAL VALUE
  const [value, setValue] = useState(startValue)

  //FUNCTION TOGGLES VALUE TO BE THE OPPOSITE OF WHATEVER BOOLEAN IS PASSED IN
  const toggle = () => {setValue(!value)}

   //RETURNS VALUE AND FUNCTION
  return [value, toggle];
}

export default UseToggle;


