import AnswerQuiz from "./AnswerQuiz";
import CreateQuiz from "./CreateQuiz";
import { Route, Routes } from "react-router-dom";
import HeaderLogged from "./HeaderLogged";
import "./loggedin.css";
export default function Home(prop) {
  return (
    <main className="home">
      <HeaderLogged />
      <Routes>
        <Route path="/" element={<AnswerQuiz />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Routes>
    </main>
  );
}
