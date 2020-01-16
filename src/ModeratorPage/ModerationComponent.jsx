import React, { useState } from "react";
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

function ModerationComponent({
  description,
  photo,
  classes,
  handleSnackBar,
  postId,
  userId,
  comments,
  // owner,
  token
}) {
  const [isTakenInCharge, setIsTakenInCharge] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  const handleTakeInCharge = () => {
    setIsTakenInCharge(!isTakenInCharge);
  };

  const handleResolved = () => {
    setIsResolved(!isResolved);
  };

  return (
    <>
      <Card className={classes.card} style={{ width: "45vw" }}>
        <CardHeader
          avatar={
            <>
              <Typography>Nom de l'élève qui lancé l'alerte</Typography>
              <Avatar aria-label="recipe" className={classes.avatar}>
                <PermIdentity />
              </Avatar>
            </>
          }
        />
        <CardContent>
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
    </>
  );
}

export default ModerationComponent;
