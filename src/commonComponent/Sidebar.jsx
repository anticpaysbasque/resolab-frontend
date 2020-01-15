import React from "react";

import "../Layout/Scroll.css";
import UserInfo from "../UserPage/UserInfo";
import Notifications from "./Notifications";
import DiscussContacts from "./DiscussContacts";

export default function Sidebar({ classes }) {
  return (
    <div style={{ position: "fixed", top: "300px" }}>
      <UserInfo classes={classes} />
      <Notifications classes={classes} />
      <DiscussContacts classes={classes} />
    </div>
  );
}
