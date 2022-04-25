import React, { useState } from "react";
import SignIn from "./Signin";
import SignUp from "./Signup";

export default function Login() {
  const [show, setShow] = useState(true);
  return (
    <main className="login">
      <nav className="login-nav">
        <p
          style={{
            borderBottom: show ? 2 + "px solid white" : "",
            fontSize: show ? 1.4 + "rem" : "",
            fontWeight: show ? 700 : 400
          }}
          onClick={() => setShow(true)}
        >
          Sign-IN
        </p>
        <p
          style={{
            borderBottom: !show ? 2 + "px solid white" : "",
            fontSize: !show ? 1.4 + "rem" : "",
            fontWeight: !show ? 700 : 400
          }}
          onClick={() => setShow(false)}
        >
          Sign-UP
        </p>
      </nav>
      <div className="sign-x">
        <div className={"show" + show}>
          <SignIn />
        </div>
        <div className={"show" + !show}>
          <SignUp />
        </div>
      </div>
    </main>
  );
}
