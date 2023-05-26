import React, {useEffect, useRef, useState} from "react";
import image from '../images/button_left_menu.png';
import user_icon from '../images/user_icon.png'
import toodle_icon from '../images/toodle_icon.png'
import LeftMenu from "../components/LeftMenu";
import Input from "../components/Input";
import lines from "../images/lines.png";
import axios from 'axios';
import {getQueriesForElement} from "@testing-library/react";

const LongPage = () => {
    const [menuActive, setMenuActive] = useState(false)
    const [questions, setQuestions] = useState([])
    const [showAnswer, setShowAnswer] = useState(false)
    const [data, setData] = useState("")
    const [rotate, setRotaiting] = useState(false)
    const firstFaqRef = useRef(null);
    const secondFaqRef = useRef(null);




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
                }}
            />

            <div className={menuActive ? "work-area active" : "work-area"}>
                <div>
                    <div className={"question_group"}>
                        <div className={"second_message"}>
                            <img
                            src={toodle_icon}
                            style={{
                                position: "relative"
                            }}
                            className={"toodle_icon"}
                            />
                            <div className={"faq_cont"} ref={firstFaqRef} style={{marginRight: "8%"}}>
                                <h1 style={{position: "relative", left: "-0.5%", marginTop: "1.5%"}}><b>Toodles</b></h1>
                                <p>Я - сервис Toodles. Меня создала группа студентов второго курса института ИРИТ-РТФ. Я могу сгенерировать уникальные тексты по вашему запросу. При написании запроса начните со слова-действия: создай, напиши, сделай и т.д. Если вы хотите сгенерировать сочинение, комментарий, эссе, не забудьте указать это. Будьте конкретными, предоставьте соответствующий контекст и используйте правильную грамматику.</p>
                            </div>
                        </div>
                        <div className={"second_message"}>
                            <img
                                src={toodle_icon}
                                style={{
                                    marginTop: "4%",
                                    position: "relative"
                                }}
                                className={"toodle_icon"}
                            />
                            <div className={"faq_cont"} style={{ marginTop: "4%", marginRight: "8%"}}>
                                <h1 style={{position: "relative", left: "-0.5%", marginTop: "1.5%"}}><b>Toodles</b></h1>
                                <p>Мои создатели не несут ответсвенности за мои ответы. Если вы не удовлетворены ответом или нуждаетесь в дополнительной информации, попробуйте перефразировать свой запрос.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LeftMenu items={items} active={menuActive} setActive={setMenuActive} href={"/long"}/>
        </div>
    )
}

export default LongPage