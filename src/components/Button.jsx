import React from 'react';
import "../css/Button.css";

const Button = ({ marginTop, Text, Height, onClick, Width }) => {

  return (
    <button
      className="button_body"
      style={{
        marginTop: marginTop,
        height: Height,
        width: Width,
      }}
      onClick={onClick}
    >
      {Text}
    </button>
  );
};

export default Button;
