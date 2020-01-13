import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List } from "@material-ui/core";

import apiCallAuth from "../apiCallAuth";
import LikeNotification from "./LikeNotification";

function NotifyLikes({ userId }) {
  const [userLikes, setUserLikes] = useState([]);
  const [likesForUser, setLikesForUser] = useState([]);

  const fetchLikes = page => {
    // retreiving all posts from database until there is no more post
    const nextPage = page + 1;
    let newUserLikes = [];
    apiCallAuth
      .get(`/likes?page=${page}`)
      .then(res => {
        const fetchedLikes = res.data;

        const fetchedUserLikes = fetchedLikes.filter(
          like =>
            (like.post && like.post.user.id === userId) ||
            (like.comment && like.comment.user.id === userId)
        );
        newUserLikes = userLikes.concat(fetchedUserLikes);
        setUserLikes(newUserLikes);
      })
      .then(
        apiCallAuth.get(`/likes?page=${nextPage}`).then(res => {
          if (res.data.length !== 0) {
            fetchLikes(nextPage);
          }
        })
      )

      .catch(err => console.log("error", err));
  };

  useEffect(() => {
    fetchLikes(1);
  }, []);

  useEffect(() => {
    setLikesForUser(userLikes.reverse().splice(0, 5));
  }, [userLikes]);

  return (
    <div>
      {likesForUser.map(like => (
        <LikeNotification like={like} />
      ))}
    </div>
  );
}
const mapStateToProps = state => {
  return { userId: state.userReducer.id };
};

export default connect(mapStateToProps)(NotifyLikes);
