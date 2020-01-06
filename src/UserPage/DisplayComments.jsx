import React, { useState } from "react";
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
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

function DisplayComments({ comments }) {
  const [displayComments, setDisplayComments] = useState(false);
  const classes = useStyles();

  return (
    <>
      {displayComments ? (
        <>
          <List className={classes.root}>
            {comments
              .slice(0)
              .reverse()
              .map(comment => (
                <Comment comment={comment} />
              ))}
          </List>
          <CardContent>
            <Typography>
              <Link
                component="button"
                onClick={() => setDisplayComments(false)}
              >
                Réduire
              </Link>
            </Typography>
          </CardContent>
        </>
      ) : (
        <>
          <List className={classes.root}>
            {comments.filter((comment => comment[0]) => (
              <Comment comment={comment} />
            ))}
          </List>
          <CardContent>
            <Typography>
              <Link component="button" onClick={() => setDisplayComments(true)}>
                Voir tous les commentaires
              </Link>
            </Typography>
          </CardContent>
        </>
      )}
    </>
  );
}

export default DisplayComments;
