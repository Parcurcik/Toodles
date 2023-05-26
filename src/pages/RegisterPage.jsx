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
import axios from "axios";
import {useNavigate} from 'react-router-dom'


const Register = () => {
    const navigate = useNavigate();
    const [menuActive, setMenuActive] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isVisible = !menuActive

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSubmit();
        }
      };

    const handleClick = () => {
        setMenuActive(!menuActive);
    }


    const handleSubmit = () => {
        const data = {
            email: email,
            password: password
        };



        axios.post('http://127.0.0.1:5000/api/login', data)
            .then(response => {

                console.log(response.data);
                const {access_token} = response.data;
                localStorage.setItem('access_token', access_token);
                navigate('/');

            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    const errorMessage = error.response.data.message;
                    console.log(errorMessage)
                }
            });
    };

    return (
        <div className="menu_main_reg">
            <div
                style={{
                    position: "absolute",
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: "1"
                }}/>
            <img
                src={lines}
                style={{
                    position: "absolute",
                    width: "100vw",
                    height: "100vh"
                }}/>

            <img
                src={logo}
                style={{}}
                className={"logo_reg"}/>

            <Input_Reg placeHolder={"Почта"} image={letter_Reg} value={email}
                       onChange={(e) => setEmail(e.target.value)}/>

            <Input_Reg placeHolder={"Пароль"} marginTop={"2%"} image={lock} input_type={"password"} value={password}
                       onChange={(e) => setPassword(e.target.value)}/>

            <Button Text={"Вход"} marginTop={"5%"} onClick={handleSubmit} onKeyPress={handleKeyPress}/>

            {isVisible && (
                <img
                    src={Register_words}
                    alt={"Зарегистрироваться"}
                    className={"reg_words"}
                    onClick={handleClick}
                />
            )}

            <RegisterMenu active={menuActive} setActive={setMenuActive}/>
        </div>
    )
}

export default Register