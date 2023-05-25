import React, {useEffect, useState} from "react";
import image from '../images/button_left_menu.png';
import user_icon from '../images/user_icon.png'
import toodle_icon from '../images/toodle_icon.png'
import LeftMenu from "../components/LeftMenu";
import Input from "../components/Input";
import lines from "../images/lines.png";
import axios from 'axios';
import {getQueriesForElement} from "@testing-library/react";

const ShortPage = () => {
    const [menuActive, setMenuActive] = useState(false)
    const [questions, setQuestions] = useState([])
    const [showAnswer, setShowAnswer] = useState(false)
    const [data, setData] = useState("")
    const [rotate, setRotaiting] = useState(false)
    const [avatar, setAvatar] = useState("")

    useEffect(() => {
        const savedAvatar = localStorage.getItem("avatar");
        setAvatar(savedAvatar)
    }, []);

    const items = [
        {value:"Спроси Toodles", href: '/short', index: 0}, {value:"Справка", href: '/long', index: 2},
    ];

    const questRequest = (data) => {
        setShowAnswer(false)
        setRotaiting(true)
        axios.post('http://127.0.0.1:5000/api/question', data)
            .then(response => {
                console.log(response);
                const answer = response.data.result
                setData(answer);
                setShowAnswer(true)
                console.log(rotate)
                setRotaiting(false)
            })
            .catch(error => {
                console.log(error);
                setRotaiting(false)
            });
    }


    const handleAddQuestion = (question) => {
        if (questions.length >= 1) {
            setQuestions((questions) => questions.slice(1));
        }
        setQuestions((questions) => [...questions, question]);



    };
    useEffect(() => {
        if (questions.length > 0) {
            questRequest(questions);
        }
    }, [questions]);


    return (

        <div className="menu_main">
            <img
                src={lines}
                style={{
                    position: "absolute",
                    width: "100vw",
                    height: "100vh"
                }}/>
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
                    height: "9%",
                }}
            />

            <div className={menuActive ? "work-area active" : "work-area"}>
                <Input onAddQuestion={handleAddQuestion} isSetRotating={rotate}/>
                <div>
                    <div className={"question_group"}>

                        {questions.map((question, index) => (
                            <div
                                className={"question_cont"}
                                key={index}>
                                <p><b>Вы</b><br/><br/>{question}</p>
                            </div>))}
                        {questions.length >= 1 && (
                            <img
                                src={avatar}
                                style={{
                                    position: "absolute",
                                    top: "6%",
                                    right: "1%",
                                    width: "3.5vw"
                                }}
                            />
                        )}
                    </div>
                    {showAnswer && (
                        <div className={"answer_cont"}>
                            <p><b>Toodles</b><br/><br/>{data}</p>
                        </div>
                    )}
                    {showAnswer && (
                        <img
                            src={toodle_icon}
                            style={{
                                position: "absolute",
                                top: "26%",
                                left: "0",
                                width: "3.5vw",
                            }}
                        />
                    )}
                </div>
            </div>
            <LeftMenu items={items} active={menuActive} setActive={setMenuActive} href={"/short"}/>
        </div>
    )
}

export default ShortPage