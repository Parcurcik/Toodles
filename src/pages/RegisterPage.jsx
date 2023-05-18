import React, {useState} from "react";
import logo from '../images/reg_logo.png'
import lines from '../images/lines.png'
import RegisterMenu from "../components/RegisterMenu";
import '../css/RegisterPage.css'
import Input_Reg from "../components/Input_Reg";
import letter_Reg from '../images/letter_Reg.png'
import lock from '../images/lock.png'
import Button from "../components/Button";
import Register_words from '../images/Register_words.png'


const Register = () => {

    const [menuActive, setMenuActive] = useState(false)

    const isVisible = !menuActive

    const handleClick = () => {
        setMenuActive(!menuActive);
    }

    return (
        <div className="menu_main_reg">
            <div
            style={{position: "absolute",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1"}}/>
            <img
            src={lines}
            style={{position:"absolute",
                    width:"100vw",
                    height: "100vh"}}/>

            <img
            src={logo}
            style={{width: "30vw",
            zIndex: "2",
            marginTop: "3%"}}/>

            <Input_Reg placeHolder={"Почта"} image={letter_Reg}/>

            <Input_Reg placeHolder={"Пароль"} marginTop={"2%"} image={lock} input_type={"password"}/>

            <Button Text={"Вход"} Width={"10vw"} marginTop={"5%"}/>

            {isVisible && (
                <img
                  src={Register_words}
                  alt={"Зарегистрироваться"}
                  style={{
                    width: "25vw",
                    zIndex: "2",
                    position: "absolute",
                    marginRight: "auto",
                    bottom: "5vh",
                    cursor: "pointer"
                  }}
                  onClick={handleClick}
                />
              )}

            <RegisterMenu active={menuActive} setActive={setMenuActive}/>
        </div>
    )
}

export default Register