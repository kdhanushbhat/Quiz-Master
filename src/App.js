import React, { useEffect, useState } from "react";
import Header from "./Header";
import Login from "./Login";
import Home from "./user/Home";

export const UserDetails = React.createContext();
export const ChngLog = React.createContext();
export const ChngDeatils = React.createContext();
export const Log = React.createContext();

export default function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({});

  function getDetails(username, email) {
    setUser((user) => ({ ...user, username: username, email: email }));
  }
  function changelog() {
    setLogged(!logged);
  }
  useEffect(() => {}, [user, logged]);
  return (
    <UserDetails.Provider value={user}>
      <ChngDeatils.Provider value={getDetails}>
        <ChngLog.Provider value={changelog}>
          <Log.Provider value={logged}>
            <Header />
            <main className="godbox">{logged ? <Home /> : <Login />}</main>
          </Log.Provider>
        </ChngLog.Provider>
      </ChngDeatils.Provider>
    </UserDetails.Provider>
  );
}
