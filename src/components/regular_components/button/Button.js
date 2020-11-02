import React from 'react';

export default function Button(props) {

    const style = {
        width: '150px',
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
        backgroundColor: '#d90a0a',
        borderBottom: '2px solid #cccccc',
        color: 'white',
        cursor: 'pointer',
        ...props.style     
    }

    return (
        <div onClick={props.click} style={style}>
            {props.children}
        </div>
    )
}
