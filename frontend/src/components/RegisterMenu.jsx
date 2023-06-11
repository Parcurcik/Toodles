import React, {useState} from 'react';
import '../css/RegisterMenu.css';
import reg_logo from '../images/reg_logo.png';
import InputData from "./InputData";
import Button from "./Button";
import first_image from "../images/first_image.png";
import second_image from "../images/second_image.png";
import third_image from "../images/third_image.png";
import four_image from "../images/four_image.png";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
    firstName: yup.string().required("Введите имя"),
    lastName: yup.string().required("Введите фамилию"),
    email: yup.string().email("Введите корректный адрес электронной почты").required("Введите адрес электронной почты"),
    password: yup.string().required("Введите пароль").min(6, "Пароль должен содержать минимум 6 символов"),
    repeatPassword: yup.string().oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});

const RegisterMenu = ({ items, active, setActive, href }) => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [avatar, setAvatar] = useState("../images/first_image.png");
    const [selectedImage, setSelectedImage] = useState(null);

    const setEmptyData = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
    };

    const handleImageClick = (imagePath) => {
          if (selectedImage === imagePath) {
            setSelectedImage(null); // Сбросить выбранную картинку
          } else {
            setSelectedImage(imagePath); // Установить выбранную картинку
          }
          setAvatar(imagePath);
        };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate({
                firstName,
                lastName,
                email,
                password,
                repeatPassword,
            }, { abortEarly: false });

            const data = {
                firstName,
                lastName,
                email,
                password,
                avatar
            };

            const response = await axios.post("http://127.0.0.1:5000/api/register", data);
            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);

            navigate('/');

            setEmptyData();

        } catch (error) {
              if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message;
                alert(errorMessage);
              }

              if (error instanceof yup.ValidationError) {
                const errorMessages = {};

                error.inner.forEach((validationError) => {
                  errorMessages[validationError.path] = validationError.message;
                });

                setErrors(errorMessages);
              }
            }
    };

    return (
        <div className={active ? "menu_reg active" : "menu_reg"} onClick={() => setActive(false)}>
            <div className={"menu__content_reg"} onClick={(e) => e.stopPropagation()}>
                <img
                    src={reg_logo}
                    alt={"Логотип"}
                    style={{
                        width: "17vw",
                        margin: "6% auto"
                    }}
                />
                <InputData
                  placeHolder={"Имя"}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}

                <InputData
                  placeHolder={"Фамилия"}
                  marginTop={"3.5%"}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}

                <InputData
                  placeHolder={"Почта"}
                  marginTop={"3.5%"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}

                <InputData
                  placeHolder={"Пароль"}
                  marginTop={"3.5%"}
                  input_type={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}

                <InputData
                  placeHolder={"Повторите пароль"}
                  marginTop={"3.5%"}
                  input_type={"password"}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                {errors.repeatPassword && <span className="error-message">{errors.repeatPassword}</span>}
                <p className={"avatars_h"}>Выберите аватар</p>
                <div className="avatar_cont">
                      <img
                        src={first_image}
                        style={{
                          width: "7vh",
                          cursor: "pointer",
                          border: selectedImage === "../images/first_image.png" ? "2px solid rgb(233,203,248)" : "none",
                            borderRadius: selectedImage === "../images/first_image.png" ? "50px" : "none"
                        }}
                        onClick={() => handleImageClick("../images/first_image.png")}
                       alt={""}/>
                      <img
                        src={second_image}
                        style={{
                          width: "7vh",
                          marginLeft: "1vw",
                          cursor: "pointer",
                          border: selectedImage === "../images/second_image.png" ? "2px solid rgb(233,203,248)" : "none",
                            borderRadius: selectedImage === "../images/second_image.png" ? "50px" : "none"
                        }}
                        onClick={() => handleImageClick("../images/second_image.png")}
                       alt={""}/>
                      <img
                        src={third_image}
                        style={{
                          width: "7vh",
                          marginLeft: "1vw",
                          cursor: "pointer",
                          border: selectedImage === "../images/third_image.png" ? "2px solid rgb(233,203,248)" : "none",
                            borderRadius: selectedImage === "../images/third_image.png" ? "50px" : "none"
                        }}
                        onClick={() => handleImageClick("../images/third_image.png")}
                        alt={""}
                      />
                      <img
                        src={four_image}
                        style={{
                          width: "7vh",
                          marginLeft: "1vw",
                          cursor: "pointer",
                          border: selectedImage === "../images/four_image.png" ? "2px solid rgb(233,203,248)" : "none",
                            borderRadius: selectedImage === "../images/four_image.png" ? "50px" : "none"
                        }}
                        onClick={() => handleImageClick("../images/four_image.png")}
                        alt={""}
                      />
                    </div>
                <Button Text={"Зарегистрироваться"} marginTop={"1vw"} onClick={handleSubmit} Width={"75%"} />
            </div>
        </div>
    );
};

export default RegisterMenu;