import { useState, useEffect, useContext } from "react";
import { QuizComplete } from "./AnswerQuiz";
import { GrLinkNext } from "react-icons/gr";
export default function QuizQuestions(prop) {
  const [timer, setTimer] = useState(prop.quiz["duration"]);
  let timr = prop.quiz["duration"];
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [clist, setClist] = useState({});
  const [choiceList, setChoiceList] = useState([]);
  const finish = useContext(QuizComplete);
  let choice = "";
  let key = 0;
  const questionList = prop.quiz["questionslist"];
  const [question, setQuestion] = useState(questionList[index]);
  let optionList = question["optlist"];

  const options = optionList.map((item) => {
    key = key + 1;
    return (
      <p
        key={key}
        className="choices"
        onClick={() => {
          handleChoice(item);
        }}
      >
        {item}
      </p>
    );
  });

  function handleChoice(item) {
    choice = item.toString();
    for (let i of document.getElementsByClassName("choices")) {
      if (i.innerHTML === choice) {
        i.style.backgroundColor = "blue";
        i.style.color = "white";
        i.style.fontWeight = 900;
      } else {
        i.style.backgroundColor = "";
        i.style.color = "black";
        i.style.fontWeight = 600;
      }
    }
    setClist({ question: question, choice: choice });
  }
  function handleClick() {
    if (clist["choice"] === question["correct-opt"]) {
      setScore((score) => score + 1);
    }

    setChoiceList((list) => [...list, clist]);
    if (index !== questionList.length - 1) {
      setIndex((index) => index + 1);
    } else {
      setComplete(true);
    }
  }
  useEffect(() => {
    setQuestion(questionList[index]);
    setClist({});
  }, [index, questionList]);
  useEffect(() => {
    for (let i of document.getElementsByClassName("choices")) {
      i.style.backgroundColor = "";
      i.style.color = "black";
      i.style.fontWeight = 600;
    }
  }, [question]);
  useEffect(() => {
    setClist({});
  }, [complete]);

  const answers = choiceList.map((item) => {
    return (
      <div className="answer-box">
        <p>Question : {item["question"]["question"]}</p>
        <p>Answer : {item["question"]["correct-opt"]}</p>
        <p>Your Choice : {item["choice"]}</p>
      </div>
    );
  });
  function handleStartClick() {
    setStart(true);
    let x = setInterval(() => {
      let seconds =
        parseInt(timr.split(":")[0], 10) * 60 +
        parseInt(timr.split(":")[1], 10) -
        1;

      if (seconds === 0 || complete === true) {
        console.log("here");
        clearInterval(x);
        setComplete(true);
      } else {
        let mins = Math.floor(seconds / 60).toString();
        let secs = (seconds % 60).toString();
        timr = mins + ":" + secs;
        setTimer(timr);
      }
    }, 1000);
  }
  return (
    <>
      {start ? (
        complete ? (
          <div className="post-complete">
            <p className="score">Your Score : {score}</p>
            {answers}
            <button className="finish-quiz" onClick={() => finish()}>
              Finish
            </button>
          </div>
        ) : (
          <div className="quiz-box">
            <p className="quiz-timer">{timer}</p>
            <div className="quiz-question">
              <p>Question : {question["question"]}</p>
              <div className="options">{options}</div>
              <button className="next-quest" onClick={handleClick}>
                <GrLinkNext className="next-icon" />
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="quiz-start">
          <p>Title : {prop.quiz["title"]}</p>
          <p>Duration : {prop.quiz["duration"]} minutes</p>
          <button onClick={handleStartClick}>start</button>
          <button onClick={() => finish()}>back</button>
        </div>
      )}
    </>
  );
}
