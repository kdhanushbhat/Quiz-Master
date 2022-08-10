import { useEffect, useState } from "react";
export default function Signup() {
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState("");
  const [userlist, setList] = useState(() => {
    const lst = localStorage.getItem("users");
    if (lst) {
      return JSON.parse(lst);
    } else {
      return [];
    }
  });
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setAlert("");
    setUser((user) => ({ ...user, [name]: value }));
  }
  function reset() {
    for (let x of document.getElementsByTagName("input")) {
      x.value = "";
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (userlist.length === 0) {
      setList((list) => [...list, user]);
      setAlert("email registration successful");
      reset();
      return;
    }
    for (let usr of userlist) {
      if (usr["email"] === user["email"]) {
        setAlert("email already registered");
        return;
      }
    }
    setList((list) => [...list, user]);
    setAlert("email registration successful");
    reset();
  }
  useEffect(() => {
    console.log("here");
    localStorage.setItem("users", JSON.stringify(userlist));
  }, [userlist]);
  return (
    <div className="signup">
      <h1>Signup</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="username-label">
          Username
          <input
            className="login-input"
            name="username"
            type="text"
            onChange={handleChange}
            required
          />
        </p>
        <br />
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
        <br />
        <p className="alert">{alert}</p>
        <input className="login-submit " type="submit" value="Submit" />
      </form>
    </div>
  );
}
