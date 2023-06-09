import React from 'react';
import "../css/InputReg.css"


const InputReg = ({marginTop, placeHolder, image, input_type = "text", value, onChange}) => {
    return (
        <div className={"inp_reg_body"}
             style={{marginTop: marginTop}}>
            <label
                style={{
                    width: "90%",
                    alignItems: "center",
                    display: "flex"
                }}>
                <input
                    placeholder={placeHolder}
                    style={{
                        borderBottom: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        paddingLeft: "2vw",
                        marginTop: "2%"
                    }}
                    type={input_type}
                    className={"inp_text_data"}
                    value={value}
                    onChange={onChange}
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

export default InputReg;