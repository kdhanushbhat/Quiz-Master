import { useContext } from "react";
import { UserDetails, ChngLog } from "../App";
import { NavLink } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
export default function HeaderLogged() {
  const user = useContext(UserDetails);
  const log = useContext(ChngLog);

  const navLinkStyles = ({ isActive }) => {
    return {
      border: isActive ? "solid white " : "none",
      borderWidth: isActive ? "0px 0px 5px" : "0px",
      fontWeight: isActive ? "bold" : "normal",
      fontColor: isActive ? "black" : "white"
    };
  };

  return (
    <header className="home-header">
      <div className="user-details">
        <div>
          <h3>Welcome , {user["username"]}</h3>
          <h5>{user["email"]}</h5>
        </div>
        <button className="logout" onClick={() => log()}>
          <CgLogOut />
        </button>
      </div>
      <div className="icons"></div>
      {log && (
        <nav className="home-nav">
          <NavLink style={navLinkStyles} className="nav-link" to="/">
            Answer quiz
          </NavLink>
          <NavLink style={navLinkStyles} className="nav-link" to="/create-quiz">
            Create quiz
          </NavLink>
        </nav>
      )}
    </header>
  );
}
