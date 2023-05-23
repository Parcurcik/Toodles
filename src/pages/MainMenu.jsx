import React, {useState} from "react";
import logo from '../images/logo.png'
import image from '../images/button_left_menu.png'
import lines from '../images/lines.png'
import LeftMenu from "../components/LeftMenu";
import DropDownMenu from "../components/DropDownMenu";


const MainMenu = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [isExpanded3, setIsExpanded3] = useState(false);

    const handleToggle = (index) => {
        if (index === 1) {
          setIsExpanded2(!isExpanded2);
          setIsVisible(false);
          setIsExpanded3(false);
        } else if (index === 2) {
          setIsExpanded3(!isExpanded3);
          setIsVisible(false);
          setIsExpanded2(false);
        } else {
          setIsVisible(!isVisible);
          setIsExpanded2(false);
          setIsExpanded3(false);
        }
      };

    const [menuActive, setMenuActive] = useState(false)
    const items = [{value:"Спроси Toodles", href: '/short', index: 0}, {value:"Справка", href: '/long', index: 2},]

    return (
        <div className="menu_main">
            <img
            src={lines}
            style={{position:"absolute",
                    width:"100vw",
                    height: "100vh"}}/>
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
                <img src={logo} className="logo-main"/>
                <div className={"DDM_cont"}>
                    <DropDownMenu content={"Спроси Toodles"} on_click={handleToggle} isFlipped={isVisible}/>
                    <div className={`content-container ${isVisible ? "visible" : "hidden"}`}>
                        <p>1) Чем занимаются программисты?</p>
                        <p>2) Напиши сочинение на тему счастье.</p>
                        <p>3) Что включить в мотивационное письмо?</p>
                    </div>
                </div>
            </div>

            <LeftMenu items={items} active={menuActive} setActive={setMenuActive}/>
        </div>
    )
}

export default MainMenu