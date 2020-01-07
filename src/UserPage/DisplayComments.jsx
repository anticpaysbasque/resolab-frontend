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
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

function DisplayComments({ comments }) {
  const [displayComments, setDisplayComments] = useState(false);
  const [arrComments, setComments] = useState([]);
  const classes = useStyles();

  const handleDisplayComments = () => {
    setDisplayComments(true);
    const commentsArr = comments.reverse();
    setComments(commentsArr);
  };

  const handleReduceComments = () => {
    setDisplayComments(false);
    const commentsArr = comments.reverse();
    let array = [];
    array.push(commentsArr[0]);
    setComments(array);
  };

  useEffect(() => {
    const commentsArr = comments.reverse();
    let array = [];
    array.push(commentsArr[0]);
    setComments(array);
  }, []);

  return (
    <>
      {comments.length > 0 && (
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
                  <Link component="button" onClick={handleReduceComments}>
                    Réduire
                  </Link>
                </Typography>
              </CardContent>
            </>
          ) : (
            <>
              <List className={classes.root}>
                {arrComments.map(eachComment => (
                  <Comment comment={eachComment} />
                ))}
              </List>
              <CardContent>
                <Typography>
                  <Link component="button" onClick={handleDisplayComments}>
                    Voir tous les commentaires
                  </Link>
                </Typography>
              </CardContent>
            </>
          )}
        </>
      )}
    </>
  );
}

export default DisplayComments;
