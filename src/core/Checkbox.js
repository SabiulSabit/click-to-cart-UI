import React, { useState, useEffect } from "react";

const Checkbox = ({ categories }) => {

  const [checked, setChecked] = useState([]);
 
  const handelToggle = c => () => {
    
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
   
    //check not  found
    if(currentCategoryId === -1) {
         newCheckedCategoryId.push(c);
    }
    else{
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);


  }

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input onChange={handelToggle(c._id)} value={checked.indexOf(c._id === -1 )} type="checkbox" className="form-check-input" />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};

export default Checkbox;
