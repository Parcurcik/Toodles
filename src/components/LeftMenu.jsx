import React, {useEffect, useState} from 'react';
import '../css/Menu.css'
import image from "../images/button_left_menu.png";
import profile_image from "../images/first_image.png"
import toodle_logo_small from "../images/toodle_logo_small.png";
import logout_img from "../images/logout.png"
import {useNavigate} from 'react-router-dom'
import axios from "axios";


const LeftMenu = ({items, active, setActive, href}) => {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    useEffect(() => {
        const savedFirstName = localStorage.getItem("firstName");
        const savedLastName = localStorage.getItem("lastName");
        const savedAvatar = localStorage.getItem("avatar");

        if (savedFirstName && savedLastName && savedAvatar) {
            setFirstName(savedFirstName);
            setLastName(savedLastName);
            setAvatar(savedAvatar);
        } else {
            const fetchData = async () => {
                try {
                    const response = await axios.get("http://127.0.0.1:5000/api/user", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                    });

                    const {firstName, lastName, avatar} = response.data;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setAvatar(avatar);

                    localStorage.setItem("firstName", firstName);
                    localStorage.setItem("lastName", lastName);
                    localStorage.setItem("avatar", avatar);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchData();
        }
    }, []);



    const logout = () => {
        localStorage.clear()
        navigate('/registration');
    }


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
                        top: "2%",
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
                    {items.map(item =>
                        <li key={item.index}>
                            <div className={"menu_cont_div " + (item.href === href ? "active_href" : "")}>
                                <a href={item.href}>{item.value}</a>
                            </div>
                        </li>
                    )}
                </ul>
                <div className={"profile_cont"}>
                    <img src={avatar}
                         alt={"Аватар пользователя"}
                         style={{marginLeft: "5%", width: "4vh"}}/>
                    <p>{firstName} {lastName}</p>
                    <img
                        src={logout_img}
                        alt={"Выход из профиля"}
                        style={{width: "5vh", cursor: "pointer", position: "relative", right: "1%"}}
                        onClick={() => {
                            logout()
                        }}/>
                </div>
            </div>
        </div>
    );
};

export default LeftMenu;