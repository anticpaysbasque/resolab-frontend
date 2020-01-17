import React from "react";
import { Typography, Card, CardMedia } from "@material-ui/core";
import { useState } from "react";

function ModerationContent({ classes, openAlert }) {
  if (openAlert.post) {
    return (
      <>
        <Typography>
          {openAlert.user.username} a lancé une alerte sur la publication de{" "}
          {openAlert.post.user.username} :
        </Typography>
        <Card>
          {openAlert.post.photo && (
            <CardMedia className={classes.media} image={openAlert.post.photo} />
          )}
          <Typography>"{openAlert.post.description}"</Typography>
          <Typography>{openAlert.post.createdAt}</Typography>
        </Card>
      </>
    );
  }
  if (openAlert.comment) {
    return (
      <>
        <Typography>
          {openAlert.user.username} a lancé une alerte sur le commentaire de{" "}
          {openAlert.comment.user.username} :
        </Typography>
        <Card>
          <Typography>"{openAlert.comment.content}"</Typography>
          <Typography>{openAlert.comment.createdAt}</Typography>
        </Card>
      </>
    );
  }
  if (openAlert.story) {
    return (
      <>
        <Typography>
          {openAlert.user.username} a lancé une alerte sur la story de
          {openAlert.story.user.username} :
        </Typography>
        <Card>
          {openAlert.story.image && (
            <CardMedia
              className={classes.media}
              image={openAlert.story.image}
            />
          )}

          <Typography>{openAlert.story.date}</Typography>
        </Card>
      </>
    );
  }
  if (openAlert.chat) {
    return (
      <Typography>
        {openAlert.user.username} a lancé une alerte sur la discussion de{" "}
        {openAlert.chat.user.username} :
      </Typography>
    );
  }
}

export default ModerationContent;
