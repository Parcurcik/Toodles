import React, {useState} from 'react';
import '../css/Menu.css'
import image from "../images/button_left_menu.png";
import toodle_logo_small from "../images/toodle_logo_small.png";

const LeftMenu = ({items, active, setActive, href}) => {
    return (
        <div className={active ? "menu active" : "menu"}>
            <div className={"menu__content"}>
                <img
                  src={image}
                  alt=""
                  onClick={() => setActive(false)}
                  className={"menu-btn"}
                  style={{
                      position: "relative",
                      transform: "rotate(90deg)",
                      transition: "0.4s all",
                      alignSelf: "end",
                      right: "-11%",
                      top:"2%",
                      width: "22.5%",
                      height: "9%"
                }}
                />
                <div className="menu__header"></div>
                <img
                    src={toodle_logo_small}
                    alt=""
                    style={{
                        width: "60%",
                        position: "relative",
                        top: "-5%",
                        cursor: "pointer"
                            }}
                    onClick={() => {
                        window.location.href = "/";
                    }}/>
                <ul>
                    {items.map( item =>
                    <li key={item.index}>
                        <div className={"menu_cont_div " + (item.href === href ? "active_href" : "")}>
                          <a href={item.href}>{item.value}</a>
                        </div>
                    </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default LeftMenu;