import { useContext } from "react";
import { Quest, QlistSet } from "./CreateQuiz";
export default function Qform() {
  const setqst = useContext(Quest);
  const lstChange = useContext(QlistSet);
  const olist = [];
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setqst(name, value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    for (let x of document.getElementsByName("opt")) {
      let value = x.value;
      olist.push(value);
    }
    olist.push(document.getElementsByName("correct-opt")[0].value);
    setqst("optlist", olist);
    lstChange();
  }

  return (
    <div className="qform">
      <form className="question-form" onSubmit={handleSubmit}>
        <label className="qform-label">
          Question :
          <textarea
            rows="3"
            cols="40"
            name="question"
            maxLength="100"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label className="qform-label">
          Correct Option :
          <input
            name="correct-opt"
            size="40"
            type="text"
            onChange={handleChange}
            required
          />
        </label>

        <br />
        <label className="qform-label">
          Option 2 :
          <input name="opt" size="40" type="text" required />
        </label>

        <br />
        <label className="qform-label">
          Option 3 :
          <input name="opt" size="40" type="text" />
        </label>

        <br />
        <label className="qform-label">
          Option 4 :
          <input name="opt" size="40" type="text" />
        </label>
        <br />
        <div className="addq-btn">
          <button className="add-btn" name="submit" type="submit">
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
}
