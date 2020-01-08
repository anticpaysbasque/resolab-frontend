import React, { useState, useEffect } from "react";
import Comment from "./Comment";

// import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  CardActions,
  IconButton,
  CardContent,
  Link
} from "@material-ui/core";

function DisplayComments({ comments, classes }) {
  return (
    <>
      {comments.length > 0 ? (
        <>
          <List className={classes.root}>
            {comments
              .slice(0)
              .reverse()
              .map(comment => (
                <Comment comment={comment} classes={classes} />
              ))}
          </List>
        </>
      ) : (
        <CardContent>
          <Typography>Aucun commentaire</Typography>
        </CardContent>
      )}
    </>
  );
}

export default DisplayComments;
