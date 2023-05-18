import React from 'react';
import "../css/InputReg.css"


const Input_Reg = ({marginTop, placeHolder, image, input_type="text"}) => {
    return (
        <div className={"inp_reg_body"}
        style={{marginTop: marginTop}}>
            <label
                style={{
                    width: "22vw",
                    marginTop: "1%"
                }}>
                <input

                  placeholder={placeHolder}
                  style={{
                    borderBottom: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    paddingLeft: "2vw",
                  }}
                  type={input_type}
                  className={"inp_text_data"}
                />
      </label>
            <img
            src={image}
            alt={""}
            style={{
              width: "3.5vh",
              height: "3.5vh",
              marginLeft: "auto",
              marginRight: "1.5vw",
              alignSelf: "center"
            }}/>
        </div>
    );
};

export default Input_Reg;