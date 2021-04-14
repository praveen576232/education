import { Avatar } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import "./Header.css";
import { useStateValue } from "./statemangement/statemangement";

function Header() {
  const [{user},] = useStateValue();
  const history = useHistory()
  return (
    <div className="header">
		<div className="header-space"></div>
      <h4>About</h4>
      <div className="header-sigin">
        {user !== null ? (
          <div className="header-signout">
            <Avatar src={user?.photoURL}/>
            <p>Sign out </p>
          </div>
        ) : (
          <p onClick={()=>{history.push('/login')}}>Sign In</p>
        )}
      </div>
    </div>
  );
}

export default Header;
