import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import LikeNotification from "./LikeNotification";

function NotifyLikes({ userId, setCount }) {
  const [userLikes, setUserLikes] = useState([]);
  const [likesForUser, setLikesForUser] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchLikes = page => {
    // retreiving all posts from database until there is no more post
    const nextPage = page + 1;
    let newUserLikes = [];
    axios
      .get(`${apiUrl}/likes?page=${page}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          Accept: "application/json"
        }
      })
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
        axios
          .get(`${apiUrl}/likes?page=${nextPage}`, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
              Accept: "application/json"
            }
          })
          .then(res => {
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

  useEffect(() => setCount(likesForUser.length), [likesForUser]);

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
