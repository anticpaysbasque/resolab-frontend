import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  Typography,
  Switch,
  IconButton,
  Paper,
  Button,
  CircularProgress
} from "@material-ui/core";
import PermIdentity from "@material-ui/icons/PermIdentity";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";

import ModerationContent from "./ModerationContent";
import { removeAlert } from "../reducers/actions";

const apiUrl = process.env.REACT_APP_API_URL;

function ModerationComponent({ openAlert, classes, removeAlert, token }) {
  const [isBlocked, setIsBlocked] = useState(true);
  const [isBlockedLoading, setIsBlockedLoading] = useState(false);
  const [isTakenInCharge, setIsTakenInCharge] = useState(openAlert.takenCare);
  const [isResolved, setIsResolved] = useState(false);
  const [isResolvedLoading, setIsResolvedLoading] = useState(false);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  const handleBlocked = () => {
    setIsBlockedLoading(true);
    if (openAlert.post) {
      axios
        .put(
          `${apiUrl}/posts/${openAlert.post.id}`,
          {
            display: true
          },
          config
        )
        .then(res => {
          setIsBlocked(!isBlocked);
          console.log(res);
        })
        .catch(err => console.log(err))
        .finally(() => setIsBlockedLoading(false));
    }
    if (openAlert.story) {
      axios
        .put(
          `${apiUrl}/stories/${openAlert.story.id}`,
          {
            display: true
          },
          config
        )
        .then(res => {
          setIsBlocked(!isBlocked);
          console.log(res);
        })
        .catch(err => console.log(err))
        .finally(() => setIsBlockedLoading(false));
    }
    if (openAlert.comment) {
      axios
        .put(
          `${apiUrl}/comments/${openAlert.comment.id}`,
          {
            display: true
          },
          config
        )
        .then(res => {
          setIsBlocked(!isBlocked);
          console.log(res);
        })
        .catch(err => console.log(err))
        .finally(() => setIsBlockedLoading(false));
    }
  };

  const handleTakeInCharge = () => {
    const takenInCharge = isTakenInCharge;
    axios
      .put(
        `${apiUrl}/alerts/${openAlert.id}`,
        {
          takenCare: !takenInCharge
        },
        config
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    setIsTakenInCharge(!isTakenInCharge);
  };

  const handleResolved = () => {
    setIsResolved(!isResolved);
    setIsResolvedLoading(true);
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
      .catch(err => console.log(err))
      .finally(() => setIsResolvedLoading(false));
  };

  return (
    <Card
      className={classes.card}
      style={{ width: "45vw" }}
      style={{ textAlign: "center" }}
    >
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
      <CardContent>
        <ModerationContent openAlert={openAlert} classes={classes} />
        <Grid
          container
          items
          xs={10}
          display="flex"
          direction="row"
          style={{ margin: "auto", padding: "5px" }}
        >
          <Paper padding={"5px"} elevation={1} style={{ textAlign: "center" }}>
            <Typography>
              Message laissé par {openAlert.user.username} concernant cette
              alerte :
            </Typography>
            <Typography>"Cette publication me pose problème."</Typography>
          </Paper>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container>
          <Grid item xs={4}>
            <Button
              variant="contained"
              startIcon={isBlockedLoading && <CircularProgress />}
              disabled={isBlockedLoading}
              color={isBlocked ? "secondary" : "primary"}
              onClick={handleBlocked}
            >
              Débloquer le contenu
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography>Prise en charge du problème</Typography>
            <Switch
              checked={isTakenInCharge}
              onChange={handleTakeInCharge}
              value={isTakenInCharge}
              color="secondary"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              startIcon={isResolvedLoading && <CircularProgress />}
              disabled={isResolvedLoading}
              color={isResolved ? "primary" : "secondary"}
              onClick={handleResolved}
            >
              Problème résolu
            </Button>
          </Grid>
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
  openAlert: state.alertReducer.alert,
  token: state.authReducer.token
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModerationComponent);
