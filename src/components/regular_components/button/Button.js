import React from 'react';
import './Button.css';

export default function Button(props) {
    return (
        <div className={`Button ${props.class}`} onClick={props.click} style={props.style}>
            {props.children}
        </div>
    )
}
