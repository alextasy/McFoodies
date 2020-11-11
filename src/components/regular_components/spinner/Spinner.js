import React from 'react';
import './Spinner.css'

function Spinner(props) {

    const smallStyle = {
        width: '65px',
        height: '65px',
        border: '10px solid transparent',
        borderLeft: '10px solid #d90a0a'
    }


    return (
        <div className='Spinner' style={props.small ? smallStyle : null }>
            
        </div>
    )
}

export default Spinner;
