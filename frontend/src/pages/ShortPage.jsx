import React, { useEffect, useState } from "react";
import image from '../images/button_left_menu.png';
import toodle_icon from '../images/toodle_icon.png'
import LeftMenu from "../components/LeftMenu";
import Input from "../components/Input";
import lines from "../images/lines.png";
import axios from 'axios';

const ShortPage = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [data, setData] = useState("");
  const [rotate, setRotating] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const savedAvatar = localStorage.getItem('avatar');
    const savedData = localStorage.getItem('data');
    const savedQuestions = localStorage.getItem('questions');
    const savedShowAnswer = localStorage.getItem('showAnswer');

    if (savedAvatar) {
      setAvatar(savedAvatar);
    }

    if (savedData) {
      setData(savedData);
    }

    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }

    if (savedShowAnswer === 'true') {
      setShowAnswer(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('avatar', avatar);
  }, [avatar]);

  useEffect(() => {
    localStorage.setItem('data', data);
  }, [data]);

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('showAnswer', showAnswer.toString());
  }, [showAnswer]);

  const items = [
    { value: "Спроси Toodles", href: '/short', index: 0 },
    { value: "Справка", href: '/long', index: 2 },
  ];

  const questRequest = (data) => {
    setShowAnswer(false);
    setRotating(true);
    axios.post('http://127.0.0.1:5000/api/question', data)
      .then(response => {
        const answer = response.data.result;
        setData(answer);
        setShowAnswer(true);
        setRotating(false);
      })
      .catch(error => {
        console.log(error);
        setRotating(false);
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
        }}
        alt={""}
        className={"lines"}
      />
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
        <Input onAddQuestion={handleAddQuestion} isSetRotating={rotate} />
        <div>
          <div className={"question_group"}>
            {questions.map((question, index) => (
              <div className={"question_cont"} key={index}>
                <p><b>Вы</b><br /><br />{question}</p>
              </div>
            ))}
            {questions.length >= 1 && (
              <img
                src={
                  avatar === "../images/third_image.png"
                    ? require("../images/third_image.png")
                    : avatar === "../images/first_image.png"
                    ? require("../images/first_image.png")
                    : avatar === "../images/second_image.png"
                    ? require("../images/second_image.png")
                    : avatar === "../images/four_image.png"
                    ? require("../images/four_image.png")
                    : ""
                }
                style={{
                  position: "absolute",
                  top: "6%",
                  right: "1%",
                }}
                className={"avatar_img_screen"}
                alt={""}
              />
            )}
          </div>
          {showAnswer && (
            <div className={"answer_cont"}>
              <p><b>Toodles</b><br /><br />{data}</p>
            </div>
          )}
          {showAnswer && (
            <img
              src={toodle_icon}
              style={{
                position: "absolute",
                left: "0",
              }}
              alt={""}
              className={"avatar_img_screen_2"}
            />
          )}
        </div>
      </div>
      <LeftMenu items={items} active={menuActive} setActive={setMenuActive} href={"/short"} />
    </div>
  );
}

export default ShortPage;
