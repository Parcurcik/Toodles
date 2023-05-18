import React, { useState } from 'react';
import letter from '../images/letter.png';
import gray_toodle from '../images/gray_toodle.png';
import "../css/Input.css";

const Input = ({ onAddQuestion, isSetRotating }) => {
  const [isRotating, setIsRotating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputIndex = useState(0)

  const handleLetterClick = () => {
    if (inputValue) {
      onAddQuestion(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    if (inputValue) {
      onAddQuestion(inputValue);
      setInputValue("");
    }
  }
}

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }


  return (
    <div className={"input_body" + (isFocused ? " input_body--focused" : "")}>
      <label
        style={{
          width: "47.5vw",
          marginTop: "1%",
        }}>
        <input
          placeholder={isFocused ? 'Пиши вопросик...' : ''}
          style={{
            borderBottom: 'none',
            outline: 'none',
            boxShadow: 'none',
            paddingLeft: "2vw",
          }}
          type="text"
          className={"input_text"}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </label>
      <img
        src={isSetRotating ? gray_toodle : letter}
        alt={""}
        style={{
          width: "2vw",
          cursor: "pointer",
          marginLeft: "auto",
          marginRight: "1.75vw",
        }}
        onClick={handleLetterClick}
        className={isSetRotating ? "rotate rotate-toodle" : ""}
      />
    </div>
  );
}

export default Input;