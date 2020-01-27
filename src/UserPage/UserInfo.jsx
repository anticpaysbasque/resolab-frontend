import React, { useEffect, useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import { Face, ExpandMore } from "@material-ui/icons";
import { connect } from "react-redux";
import axios from "axios";

const baseUrl = process.env.REACT_APP_MEDIA_URL;

function UserInfo({
  classes,
  username,
  firstName,
  lastName,
  classroom,
  token
}) {
  const [userClassroom, setuserClassroom] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}${classroom}`, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      })
      .then(res => setuserClassroom(res.data.name));
  });

  return (
    <ExpansionPanel className={classes.sidebarCard}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.sidebarCardHeader}
      >
        <Face className={classes.sidebarCardHeaderElements} />
        <Typography className={classes.sidebarCardHeaderElements}>
          {firstName} {lastName}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          {username} <br /> Ta classe : {userClassroom}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username,
    firstName: state.userReducer.firstname,
    lastName: state.userReducer.lastName,
    classroom: state.userReducer.classroom,
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(UserInfo);
