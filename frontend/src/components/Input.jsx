import React, { useState } from 'react';
import letter from '../images/letter.png';
import gray_toodle from '../images/gray_toodle.png';
import "../css/Input.css";

const Input = ({ onAddQuestion, isSetRotating }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
            className={"input_label"}
            style={{
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
          cursor: "pointer",
          marginLeft: "auto",
          marginRight: "1.75vw",
        }}
        onClick={handleLetterClick}
        className={isSetRotating ? "rotate rotate-toodle" : "input_image"}
      />
    </div>
  );
}

export default Input;