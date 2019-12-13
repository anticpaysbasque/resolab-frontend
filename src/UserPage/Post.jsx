import React from "react";
import {
  Warning,
  PermIdentity,
  ChatBubbleOutline
  //  FavoriteBorder
} from "@material-ui/icons";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography
} from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";

export default function Post({
  description,
  photo,
  classes,
  isLiked,
  handleClick
}) {
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <PermIdentity />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Warning />
          </IconButton>
        }
      />
      <CardMedia
        className={classes.media}
        image="https://placekitten.com/200/200"
      />
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {isLiked ? (
            <Favorite color="secondary" onClick={handleClick} />
          ) : (
            <FavoriteBorder color="disabled" onClick={handleClick} />
          )}
        </IconButton>
        <IconButton aria-label="add to favorites">
          <ChatBubbleOutline />
        </IconButton>
      </CardActions>
      <Collapse timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
}
