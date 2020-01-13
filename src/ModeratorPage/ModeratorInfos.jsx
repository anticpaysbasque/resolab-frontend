import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    minWidth: 350,
    padding: 0
  }
});

function ModeratorInfo() {
  // useSelector permet de mapsStateToProps sans passer par Connect
  const username = useSelector(state => state.userReducer.username);
  const firstName = useSelector(state => state.userReducer.firstname);
  const lastName = useSelector(state => state.userReducer.lastName);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        title={
          <>
            <Typography variant="h6">{username}</Typography>
            <Typography variant="subtitle1">
              {firstName} {lastName}
            </Typography>
          </>
        }
        style={{ padding: "2px" }}
      ></CardHeader>
    </Card>
  );
}

export default ModeratorInfo;
