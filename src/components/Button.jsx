import React from 'react';
import "../css/Button.css"


const Button = ({marginTop, Text, Height, onClick, Width}) => {
    return (
        <div className={"button_body"}
        style={{marginTop: marginTop,
        height: Height,
        width: Width}}
        onClick={onClick}>{Text}
        </div>
    );
};

export default Button;