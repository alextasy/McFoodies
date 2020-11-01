import React from 'react';
import './Container.css';

function Container(props) {
    return (
        <div className="Container">
            {props.children}
        </div>
        
    )
}

export default Container;
