import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import apiCallAuth from "../apiCallAuth";

function NotifyComments({ userId }) {
  const [userMessages, setUserMessages] = useState([]);
  const [commentsOnUserMessages, setCommentsOnUserMessages] = useState([]);

  const fetchPosts = page => {
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
      .then(apiCallAuth.get(`/posts?page=${nextPage}`))
      .then(res => {
        if (res.data !== 0) {
          fetchPosts(nextPage);
        }
      })
      .catch(err => console.log("error", err));
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    let comments = [];
    userMessages.forEach(message => {
      const messageComments = message.comments.map(comment => ({
        messageId: message.id,
        ...comment
      }));
      comments = comments.concat(messageComments);
    });
    setCommentsOnUserMessages(comments);
  }, [userMessages]);

  return <div>Notif</div>;
}

const mapStateToProps = state => {
  return { userId: state.userReducer.id };
};

export default connect(mapStateToProps)(NotifyComments);
