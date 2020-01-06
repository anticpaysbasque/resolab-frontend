import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  Divider,
  Typography,
  CardActions,
  IconButton
} from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  inline: {
    display: "inline"
  }
}));

function Comment({ comment }) {
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={comment.user.username}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {comment.content}
              </Typography>
            </>
          }
        />

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {isLiked ? (
              <Favorite color="secondary" />
            ) : (
              <FavoriteBorder color="disabled" />
            )}
          </IconButton>
        </CardActions>
      </ListItem>
      <Divider component="li" />
    </>
  );
}

export default Comment;
