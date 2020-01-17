import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  Typography,
  Switch,
  IconButton
} from "@material-ui/core";
import PermIdentity from "@material-ui/icons/PermIdentity";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";

import ModerationContent from "./ModerationContent";
import { removeAlert } from "../reducers/actions";

const apiUrl = process.env.REACT_APP_API_URL;

function ModerationComponent({ openAlert, classes, removeAlert }) {
  const [isTakenInCharge, setIsTakenInCharge] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  const handleTakeInCharge = () => {
    setIsTakenInCharge(!isTakenInCharge);
  };

  const handleResolved = () => {
    setIsResolved(!isResolved);
    axios
      .put(`${apiUrl}/alerts/${openAlert.id}`, {
        resolved: true
      })
      .then(res => {
        console.log(res);
        removeAlert();
      })
      .catch(err => console.log(err));
  };

  return (
    <Card className={classes.card} style={{ width: "45vw" }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <PermIdentity />
          </Avatar>
        }
        title={
          <Typography className={classes.username}>
            Alerte de {openAlert.user.username}
          </Typography>
        }
        action={
          <IconButton aria-label="settings">
            <RemoveOutlinedIcon />
          </IconButton>
        }
      />
      <CardContent>
        <ModerationContent openAlert={openAlert} classes={classes} />
        <Typography>
          Message laissé par {openAlert.user.username} concernant cette alert :
        </Typography>
        <Card>
          <Typography>"Hé j'ai un problème avec ce contenu!"</Typography>
        </Card>
      </CardContent>

      <CardActions disableSpacing>
        <Grid
          container
          item
          xs={6}
          direction="column"
          alignItems="center"
          style={{ padding: "16px" }}
        >
          <Typography>Ce prend en charge ce problème</Typography>
          <Switch
            checked={isTakenInCharge}
            onChange={() => setIsTakenInCharge(!isTakenInCharge)}
            value={isTakenInCharge}
            color="secondary"
          />{" "}
        </Grid>
        <Grid
          container
          item
          xs={6}
          direction="column"
          alignItems="center"
          style={{ padding: "16px" }}
        >
          <Typography>
            Je marque ce problème comme résolu et je clos cette alerte
            définitivement
          </Typography>
          <Switch
            checked={isResolved}
            onChange={handleResolved}
            value={isResolved}
            color="secondary"
          />
        </Grid>
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    removeAlert: () => dispatch(removeAlert())
  };
};

const mapStateToProps = state => ({
  openAlert: state.alertReducer.alert
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModerationComponent);
