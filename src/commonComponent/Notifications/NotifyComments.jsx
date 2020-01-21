import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List } from "@material-ui/core";
import axios from "axios";

import CommentNotification from "./CommentNotification";

function NotifyComments({ userId, setCount }) {
  const [userMessages, setUserMessages] = useState([]);
  const [commentsOnUserMessages, setCommentsOnUserMessages] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchPosts = async (page, previousMessages) => {
    // retreiving all posts from database until there is no more post
    const nextPage = page + 1;
    let messages = previousMessages;
    await axios
      .get(`${apiUrl}/posts?page=${page}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          Accept: "application/json"
        }
      })
      .then(async res => {
        const fetchedMessages = res.data;
        console.log("fetch ", fetchedMessages);
        messages = messages.concat(
          fetchedMessages.filter(post => post.user.id === userId)
        );
        console.log("new messages ", messages);
        await axios
          .get(`${apiUrl}/posts?page=${nextPage}`, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
              Accept: "application/json"
            }
          })
          .then(res => {
            if (res.data.length !== 0) {
              fetchPosts(nextPage, messages);
            } else {
              setUserMessages(messages);
            }
          });
      })

      .catch(err => console.log("error", err));
  };

  useEffect(() => {
    fetchPosts(1, []);
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
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    // removing comments from user
    // comments = comments.filter(comment => comment.user.id !== userId);
    setCommentsOnUserMessages(comments.reverse());
    setCount(commentsOnUserMessages.length + userMessages.length);
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
