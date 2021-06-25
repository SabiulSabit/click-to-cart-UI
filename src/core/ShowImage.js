import React from 'react';
import {API} from '../config'

const ShowImage = ({item, url, cssClassName=""}) => {

  let cls = cssClassName.length > 0 ? `${cssClassName}` : "product-img";
    return (
        <div className={cls}>
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="mb-3" ></img>
        </div>
    )
}

export default ShowImage;
