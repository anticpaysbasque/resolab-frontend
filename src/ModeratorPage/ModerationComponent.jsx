import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  IconButton,
  Typography,
  Switch
} from "@material-ui/core";
import PermIdentity from "@material-ui/icons/PermIdentity";
import { ChatBubbleOutline } from "@material-ui/icons";
import { removeAlert } from "../reducers/actions";

function ModerationComponent({ openAlert, classes }) {
  const [isTakenInCharge, setIsTakenInCharge] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  const handleTakeInCharge = () => {
    setIsTakenInCharge(!isTakenInCharge);
  };

  const handleResolved = () => {
    setIsResolved(!isResolved);
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
      />
      <CardContent>
        <Typography>
          {openAlert.user.username} a lancé une alerte concernant le contenu
          émis par
        </Typography>
        <Card>
          <Typography>Hé j'ai un problème avec ce contenu!</Typography>
        </Card>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Grid container>
            <Typography>Prise en charge du problème</Typography>
            <Switch
              checked={isTakenInCharge}
              onChange={() => setIsTakenInCharge(!isTakenInCharge)}
              value={isTakenInCharge}
              color="secondary"
            />{" "}
          </Grid>
          <Grid container>
            <Typography>Résolution du problème</Typography>
            <Switch
              checked={isResolved}
              onChange={() => setIsResolved(!isResolved)}
              value={isResolved}
              color="secondary"
            />
          </Grid>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"></IconButton>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => ({
  openAlert: state.alertReducer.alert
});

export default connect(mapStateToProps)(ModerationComponent);
