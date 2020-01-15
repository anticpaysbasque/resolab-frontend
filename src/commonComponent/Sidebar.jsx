import React from "react";

import "../Layout/Scroll.css";
import UserInfo from "../UserPage/UserInfo";
import Notifications from "./Notifications";
import Contacts from "./Contacts";

export default function Sidebar({ classes }) {
  return (
    <div style={{ position: "fixed", top: "120px" }}>
      <UserInfo classes={classes} />
      <Notifications classes={classes} />
      <Contacts classes={classes} />
    </div>
  );
}
