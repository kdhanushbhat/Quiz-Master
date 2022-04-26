import { useState, useContext } from "react";
import { ChngLog, ChngDeatils } from "./App";
import "./login_in.css";
export default function Signin() {
  const [userlist, setList] = useState(() => {
    const lst = localStorage.getItem("users");
    if (lst) {
      return JSON.parse(lst);
    } else {
      return [];
    }
  });
  const [alert, setAlert] = useState("");
  const log = useContext(ChngLog);
  const details = useContext(ChngDeatils);
  const [user, setUser] = useState({});
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUser((user) => ({ ...user, [name]: value }));
  }
  function reset() {
    for (let x of document.getElementsByTagName("input")) {
      x.value = "";
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    for (let usr of userlist) {
      if (usr["email"] === user["email"]) {
        if (usr["pass"] === user["pass"]) {
          details(usr["username"], user["email"]);
          log();
          return;
        } else {
          setAlert("wrong password");
          return;
        }
      }
    }
    setAlert("email not registered");
    reset();
  }
  return (
    <div className="signin">
      <h1>Sign In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="email-label">
          Email
          <input
            className="login-input email"
            name="email"
            type="email"
            onChange={handleChange}
            required
          />
        </p>
        <br />
        <p className="password-label">
          Password
          <input
            className="login-input"
            name="pass"
            type="password"
            onChange={handleChange}
            required
          />
        </p>
        <p className="alert">{alert}</p>
        <br />
        <input className="login-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
