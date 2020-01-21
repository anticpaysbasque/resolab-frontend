import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardActions,
  Grid,
  Avatar,
  Typography,
  Switch,
  IconButton,
  Paper
} from "@material-ui/core";
import PermIdentity from "@material-ui/icons/PermIdentity";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import ModerationContent from "./ModerationContent";
import { removeAlert } from "../reducers/actions";

const apiUrl = process.env.REACT_APP_API_URL;

function ModerationComponent({ openAlert, classes, removeAlert }) {
  const [isTakenInCharge, setIsTakenInCharge] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token")
    }
  };

  const handleTakeInCharge = () => {
    setIsTakenInCharge(!isTakenInCharge);
    axios
      .put(
        `${apiUrl}/alerts/${openAlert.id}`,
        {
          takenCare: isTakenInCharge
        },
        config
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const handleResolved = () => {
    setIsResolved(!isResolved);
    axios
      .put(
        `${apiUrl}/alerts/${openAlert.id}`,
        {
          resolved: true
        },
        config
      )
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
            <RemoveOutlinedIcon onClick={() => removeAlert()} />
          </IconButton>
        }
      />
      <ModerationContent openAlert={openAlert} classes={classes} />
      <Grid
        container
        items
        xs={10}
        display="flex"
        direction="row"
        alignItems="center"
      >
        <Paper padding={"5px"} elevation={1}>
          <Typography>
            Message laissé par {openAlert.user.username} concernant cette alerte
            :
          </Typography>
          <Typography>"Hé j'ai un problème avec ce contenu!"</Typography>
        </Paper>
      </Grid>
      <CardActions disableSpacing>
        <Grid
          container
          item
          xs={6}
          direction="column"
          alignItems="center"
          style={{ padding: "16px" }}
        >
          <Typography>Je prend en charge ce problème</Typography>
          <Switch
            checked={isTakenInCharge}
            onChange={handleTakeInCharge}
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