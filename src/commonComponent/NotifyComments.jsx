import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List } from "@material-ui/core";

import apiCallAuth from "../apiCallAuth";
import CommentNotification from "./CommentNotification";

function NotifyComments({ userId }) {
  const [userMessages, setUserMessages] = useState([]);
  const [commentsOnUserMessages, setCommentsOnUserMessages] = useState([]);

  const fetchPosts = page => {
    // retreiving all posts from database until there is no more post
    const nextPage = page + 1;
    apiCallAuth
      .get(`/posts?page=${page}`)
      .then(res => {
        const fetchedMessages = res.data;
        const fetchedUserMessages = fetchedMessages.filter(
          post => post.user.id === userId
        );
        const newUserMessages = userMessages.concat(fetchedUserMessages);
        setUserMessages(newUserMessages);
      })
      .then(
        apiCallAuth.get(`/posts?page=${nextPage}`).then(res => {
          if (res.data.length !== 0) {
            fetchPosts(nextPage);
          }
        })
      )

      .catch(err => console.log("error", err));
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    let comments = [];
    // making an array of comments from array of posts
    userMessages.forEach(message => {
      const messageComments = message.comments.map(comment => ({
        messageId: message.id,
        message: message.description,
        ...comment
      }));
      comments = comments.concat(messageComments);
    });
    // sorting comments from newer to older
    comments.sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    // removing comments from user
    comments = comments.filter(comment => comment.user.id !== userId);
    setCommentsOnUserMessages(comments);
  }, [userMessages]);

  return (
    <List>
      {commentsOnUserMessages.length < 5
        ? commentsOnUserMessages.map(comment => (
            <CommentNotification comment={comment} />
          ))
        : commentsOnUserMessages
            .splice(0, 5)
            .map(comment => <CommentNotification comment={comment} />)}
    </List>
  );
}

const mapStateToProps = state => {
  return { userId: state.userReducer.id };
};

export default connect(mapStateToProps)(NotifyComments);
