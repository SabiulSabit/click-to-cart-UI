import React, {useState, useEffect, Fragment} from 'react'

const  RadioBox = ({prices})=>  {
    const [value, setValue] = useState(0);

    const handelChange = () => {

    }

    return prices.map((p, i) => (
        <div key={i} >
          <input onChange={handelChange} value={`${p._id}`} type="radio" className="mr-2 ml-4" />
          <label className="form-check-label">{p.name}</label>
        </div>
      ));
}

export default RadioBox;
