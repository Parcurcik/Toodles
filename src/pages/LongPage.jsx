import React, {useState} from "react";
import image from '../images/button_left_menu.png'
import LeftMenu from "../components/LeftMenu";
import Input from "../components/Input";


const LongPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [isExpanded3, setIsExpanded3] = useState(false);


    const [menuActive, setMenuActive] = useState(false)
    const items = [{value:"Отвечу кратко", href: '/short', index: 0}, {value:"Отвечу развернуто", href: '/long', index: 1}, {value:"Помогу с кодом", href: '/code', index: 2},]

    return (
        <div className="menu_main">

             <img
              src={image}
              alt=""
              onClick={() => setMenuActive(!menuActive)}
              className={"menu-btn"}
              style={{
                  position: "relative",
                  top: "2%",
                  left: "1%",
                  width: "4.5%",
                  height: "9%"
              }}
              />

            <div className={menuActive ? "work-area active" : "work-area"}>
                <Input/>
            </div>

            <LeftMenu items={items} active={menuActive} setActive={setMenuActive} href={"/long"}/>
        </div>
    )
}

export default LongPage