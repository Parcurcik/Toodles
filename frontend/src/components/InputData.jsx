import React from 'react';
import "../css/InputData.css"


const InputData = ({ marginTop, placeHolder, input_type = "text", value, onChange }) => {
  return (
    <div className={"data_body"} style={{ marginTop: marginTop }}>
      <label style={{ marginTop: "2%" }} className={"label_cont"}>
        <input
          placeholder={placeHolder}
          style={{
            borderBottom: "none",
            outline: "none",
            boxShadow: "none",
            paddingLeft: "2vw",
          }}
          type={input_type}
          className={"input_text_data"}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};


export default InputData;