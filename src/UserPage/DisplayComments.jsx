import React, { useState, useEffect } from "react";
import Comment from "./Comment";

import { makeStyles } from "@material-ui/core/styles";
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
import { FavoriteBorder, Favorite } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 300
  },
  inline: {
    display: "inline"
  }
}));

function DisplayComments({ comments }) {
  const classes = useStyles();

  return (
    <>
      {comments.length > 0 ? (
        <>
          <List className={classes.root}>
            {comments
              .slice(0)
              .reverse()
              .map(comment => (
                <Comment comment={comment} />
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
