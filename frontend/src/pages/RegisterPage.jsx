import React, {useEffect, useRef, useState} from "react";
import logo from '../images/reg_logo.png'
import lines from '../images/lines.png'
import RegisterMenu from "../components/RegisterMenu";
import '../css/RegisterPage.css'
import InputReg from "../components/InputReg";
import letter_Reg from '../images/letter_Reg.png'
import lock from '../images/lock.png'
import Button from "../components/Button";
import Register_words from '../images/Register_words.png'
import axios from "axios";
import * as yup from "yup"
import {useNavigate} from 'react-router-dom'


const validationSchema = yup.object().shape({
    email: yup.string().required("Введите адрес электронной почты"),
    password: yup.string().required("Введите пароль"),
});

const Register = () => {
    const navigate = useNavigate();
    const [menuActive, setMenuActive] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const setEmptyData = () => {
        setEmail("");
        setPassword("");
    };


    const isVisible = !menuActive;
      const buttonRef = useRef(null); // Добавление референса

      useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

      const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target === document.body) {
          event.preventDefault();
          buttonRef.current.click();
        }
      };

      const handleClick = () => {
        setMenuActive(!menuActive);
      }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await validationSchema.validate({
                email,
                password,
            }, { abortEarly: false });

            const data = {
                email,
                password,
            };

            const response = await axios.post("http://127.0.0.1:5000/api/login", data);
            const {access_token} = response.data;
            localStorage.setItem('access_token', access_token);
            navigate('/');

            setEmptyData();

        } catch (error) {
            if (error instanceof yup.ValidationError) {
              const errorMessages = {};
              alert(errorMessages);

              error.inner.forEach((validationError) => {
                errorMessages[validationError.path] = validationError.message;
              });

              setErrors(errorMessages);
            }
        }
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
                }}
                alt={""}
                className={"lines"}
            />

            <img
                src={logo}
                style={{}}
                className={"logo_reg"}
                alt={""}
            />

            <InputReg placeHolder={"Почта"} image={letter_Reg} value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            {errors.email && <span className="error-message_2">{errors.email}</span>}

            <InputReg placeHolder={"Пароль"} marginTop={"2%"} image={lock} input_type={"password"} value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            {errors.password && <span className="error-message_2">{errors.password}</span>}

            <Button Text={"Вход"} marginTop={"5%"} onClick={handleSubmit} buttonRef={buttonRef}/>

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