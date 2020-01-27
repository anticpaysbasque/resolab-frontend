import React, { useState } from "react";
import {
  Typography,
  CardMedia,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Divider
} from "@material-ui/core";
import { PermIdentity, ChatBubbleOutline } from "@material-ui/icons";
import axios from "axios";
import { connect } from "react-redux";

import DisplayCommentsPostsAlerts from "./DisplayCommentsPostsAlerts";

const apiUrl = process.env.REACT_APP_MEDIA_URL;

function ModerationContent({ classes, openAlert, token }) {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  if (openAlert.post) {
    return (
      <>
        <Typography>
          {openAlert.user.username} a lancé une alerte sur la publication de{" "}
          {openAlert.post.user.username} :
        </Typography>

        {openAlert.post.photo && (
          <CardMedia className={classes.media} image={openAlert.post.photo} />
        )}
        <Typography>"{openAlert.post.description}"</Typography>
        <Typography>{openAlert.post.createdAt}</Typography>
      </>
    );
  }
  if (openAlert.comment) {
    console.log("coucou");
    let datapost;
    // let post;
    // let comments;
    axios
      .get(`${apiUrl}/api/comments/${openAlert.comment.id}`, config)
      .then(res => {
        datapost = res.data.post;
      })
      .then(() => {
        axios
          .get(`${apiUrl}${datapost}`, config)
          .then(res => {
            setPost(res.data);
            // post = res.data;
          })
          .catch(err => {
            console.log(err.message);
            throw err;
          });
      })
      .then(() => {
        // comments = post.comments;
        setComments(post.comments);
      })
      .catch(err => {
        console.log(err.message);
        throw err;
      });

    return (
      <>
        <Typography>
          {openAlert.user.username} a lancé une alerte sur le commentaire de{" "}
          {openAlert.comment.user.username} :
        </Typography>
        <Typography>"{openAlert.comment.content}"</Typography>
        <Typography>{openAlert.comment.createdAt}</Typography>
        <Divider />
        <Typography>
          Contexte dans lequel ce commentaire a été émis :
        </Typography>
        <Card style={{ width: "100%" }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <PermIdentity />
              </Avatar>
            }
            title={
              <Typography className={classes.username}>
                {openAlert.comment.user.username}
              </Typography>
            }
          />
          <CardMedia className={classes.media} image={post.photo} />
          <CardContent>
            <Typography>{post.description}</Typography>
          </CardContent>
          <Typography>Commentaires :</Typography>
          <DisplayCommentsPostsAlerts comments={comments} classes={classes} />
        </Card>
        <Divider />
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

        {openAlert.story.image && (
          <CardMedia
            className={classes.media}
            image={`http://localhost:8089/media/${openAlert.story.image.filePath}`}
          />
        )}
        <div className="separation-post-comment">
          <Typography>{openAlert.story.date}</Typography>
        </div>
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

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id,
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(ModerationContent);
