import React, { useState, useEffect, useContext } from "react";
import Qform from "./Qform";
import { BiPlusCircle } from "react-icons/bi";
import { MdOutlineDownloadDone } from "react-icons/md";

export const Qdelete = React.createContext();
export const Quest = React.createContext();
export const QlistSet = React.createContext();

export default function CreateQuiz() {
  let quest = {};
  let [quiz, setQuiz] = useState({});
  const [sbmt, setSbmt] = useState(false);
  const [qlist, setQlist] = useState([]);
  const [alrt, setalrt] = useState("");
  const [quizList, setQuizList] = useState(() => {
    if (localStorage.getItem("quizzes")) {
      return JSON.parse(localStorage.getItem("quizzes"));
    } else {
      return [];
    }
  });
  function listAdd() {
    setQlist((list) => [...list, quest]);
    setSbmt(false);
    setalrt("");
  }

  let questionsTab = qlist.map((item) => {
    return <Options key={qlist.indexOf(item)} quest={item} />;
  });

  function setquest(name, value) {
    quest[name] = value;
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz((quiz) => ({ ...quiz, [name]: value }));
  }

  function reset() {
    document.getElementsByName("title")[0].value = "";
    document.getElementsByName("duration")[0].value = "";
    setQuiz({});
    setQlist([]);
    setSbmt(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (qlist.length < 1) {
      setalrt("add questions to quiz");
      return;
    }
    alert(`${quiz["title"]}\n${quiz["duration"]}`);
    setQuiz((quiz) => ({ ...quiz, questionslist: qlist }));
  }

  function handledelete(question) {
    const index = qlist.indexOf(question);
    let list = qlist.slice(0, index).concat(qlist.slice(index + 1));
    setQlist(list);
  }

  function handleAdd() {
    setSbmt(true);
  }
  useEffect(() => {
    if (quiz["questionslist"] !== undefined) {
      setQuizList((list) => [...list, quiz]);
      reset();
    }
  }, [quiz]);

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizList));
  }, [quizList]);

  return (
    <div className="create-home">
      <h3>Add Quiz Details</h3>
      <form className="quiz-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            className="create-title-input"
            name="title"
            type="text"
            maxLength="45"
            size="50"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Duration
          <input name="duration" type="time" onChange={handleChange} required />
        </label>
        <br />
        <button className="quiz-submit" type="submit">
          <MdOutlineDownloadDone />
        </button>
      </form>
      <Qdelete.Provider value={handledelete}>{questionsTab}</Qdelete.Provider>
      <p className="alert">{alrt}</p>
      <QlistSet.Provider value={listAdd}>
        <Quest.Provider value={setquest}>
          {sbmt ? (
            <Qform />
          ) : (
            <button className="add-quest" onClick={handleAdd}>
              <BiPlusCircle />
            </button>
          )}
        </Quest.Provider>
      </QlistSet.Provider>
    </div>
  );
}

function Options(prop) {
  const handledelete = useContext(Qdelete);
  const options = prop.quest["optlist"].map((item) => {
    return (
      <p className="opt-list-create" key={prop.quest["optlist"].indexOf(item)}>
        {item}
      </p>
    );
  });
  return (
    <div className="quest-tab">
      <p>
        <span>Question : </span>
        {prop.quest["question"]}
      </p>
      <p>
        <span>Options : </span>
      </p>
      {options}
      <p>
        <span>Answer : </span>
        {prop.quest["correct-opt"]}
      </p>

      <button onClick={() => handledelete(prop.quest)}>Delete</button>
    </div>
  );
}
