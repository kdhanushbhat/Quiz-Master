import React, { useState } from "react";
import QuizQuestions from "./QuizQuestions";

export const QuizComplete = React.createContext();
export default function AnswerQuiz() {
  function getQuiz() {
    const quizList = localStorage.getItem("quizzes");
    if (quizList) {
      return JSON.parse(quizList);
    } else {
      return [];
    }
  }

  const [activeQuiz, setActiveQuiz] = useState();
  const [answer, setAnswer] = useState(false);
  const quizList = getQuiz();
  function finishQuiz() {
    setAnswer(!answer);
  }
  function handleClick(item) {
    setActiveQuiz(item);
    setAnswer(true);
  }

  const quizs = quizList.map((item) => {
    return (
      <div key={quizList.indexOf(item)} className="quiz">
        <QuizTab quiz={item} />
        <button onClick={() => handleClick(item)} className="answer-quiz-btn">
          answer
        </button>
      </div>
    );
  });

  return (
    <QuizComplete.Provider value={finishQuiz}>
      <div className="quiz-active">
        {answer ? <QuizQuestions quiz={activeQuiz} /> : quizs}
      </div>
    </QuizComplete.Provider>
  );
}

function QuizTab(prop) {
  return (
    <>
      <p>
        <span>Quiz Title : </span>
        {prop.quiz["title"]}
      </p>
      <p>
        <span>Duration : </span>
        {prop.quiz["duration"]} mins
      </p>
    </>
  );
}
