import React from 'react';
import "../css/Button.css"


const Button = ({marginTop, Text, Height, onClick}) => {
    return (
        <div className={"button_body"}
        style={{marginTop: marginTop,
        height: Height}}
        onClick={onClick}>{Text}
        </div>
    );
};

export default Button;