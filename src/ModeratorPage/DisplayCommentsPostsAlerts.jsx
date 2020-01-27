import React from "react";
import { List, Typography, CardContent } from "@material-ui/core";

import CommentPostsAlerts from "./CommentPostsAlerts";

function DisplayCommentsPostsAlerts({ comments, classes }) {
  // console.log(comments);
  return (
    <List className={classes.root}>
      {/* {comments
                // .slice(0)
                .reverse()
                .map(comment => (
                    <CommentPostsAlerts comment={comment} classes={classes} />
                ))} */}
    </List>
  );
}

export default DisplayCommentsPostsAlerts;
