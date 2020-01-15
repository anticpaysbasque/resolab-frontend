import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import apiCallAuth from "../apiCallAuth";

// const useStyles = makeStyles({
//     card: {
//         minWidth: 350,
//         padding: 0
//     }
// });

const baseUrl = process.env.REACT_APP_MEDIA_URL;

function UserInfo({ classes, username, firstName, lastName, classroom }) {
  const [userClassroom, setuserClassroom] = useState("");

  useEffect(() => {
    apiCallAuth
      .get(`${baseUrl}${classroom}`)
      .then(res => setuserClassroom(res.data.name));
  });

  // const classes = useStyles();

  return (
    <Card className={classes.sidebarCard}>
      <CardHeader
        title={
          <>
            <Typography
              className={classes.sidebarCardHeaderElements}
              variant="h6"
            >
              {username}
            </Typography>
            <Typography
              className={classes.sidebarCardHeaderElements}
              variant="subtitle1"
            >
              {firstName} {lastName}
            </Typography>
          </>
        }
        className={classes.sidebarCardHeader}
      ></CardHeader>

      <CardContent style={{ padding: "8px" }}>
        <Typography>Ta classe : {userClassroom}</Typography>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username,
    firstName: state.userReducer.firstname,
    lastName: state.userReducer.lastName,
    classroom: state.userReducer.classroom
  };
};

export default connect(mapStateToProps)(UserInfo);
