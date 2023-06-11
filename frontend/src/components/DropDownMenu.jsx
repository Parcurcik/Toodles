import React from 'react';
import "../css/DDM.css"
import quest from "../images/quest.png"
import arrow from "../images/arrow.png"

const DropDownMenu = ({content, on_click, isFlipped}) => {
    return (
        <div className={"body"} onClick={on_click}>
            <img
            src={quest}
            alt={""}
            style={{paddingLeft: "2.5vw",
            width: "5.5vw"}}/>
            <p>{content}</p>
            <img src={arrow}
            alt={""}
            style={{
            width: "2vw",
            cursor: "pointer",
            marginLeft: "auto",
            marginRight: "2vh", transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s all"
            }}
            onClick={on_click}/>
        </div>
    );
};

export default DropDownMenu;