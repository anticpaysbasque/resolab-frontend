import React from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import AlertInfo from "./AlertInfo";

function Alert({ alert, classes }) {
  return (
    <ListItem
      key={alert.id}
      style={{
        paddingTop: "0px",
        paddingBottom: "0px"
      }}
      button
    >
      <ListItemAvatar>
        <FiberManualRecordIcon
          fontSize="small"
          color={alert.takenCare ? "action" : "secondary"}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${alert.user.username} a lancé une alerte`}
        secondary={<AlertInfo alert={alert} />}
      />
    </ListItem>
  );
}

export default Alert;
